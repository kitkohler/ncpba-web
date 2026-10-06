// Shared pricing + order-total logic for the slash pile paper group order.

// Supplier's rough estimates — update as quotes firm up.
export const PRICE_POINTS = [
  { rolls: 15, price: 71 },
  { rolls: 50, price: 55 },
];

// Model: price per roll = paper cost + (fixed freight ÷ rolls), fitted to the two
// price points above. Freight is a fixed cost shared by everyone, so this matches
// how the group discount actually works.
const [a, b] = PRICE_POINTS;
const FREIGHT = (a.price - b.price) / (1 / a.rolls - 1 / b.rolls);
const PAPER = a.price - FREIGHT / a.rolls;

export function estimatePricePerRoll(totalRolls: number): number {
  return PAPER + FREIGHT / Math.max(totalRolls, 1);
}

// The original sign-up sheet the private group adds to directly (public link).
const PUBLIC_SHEET_CSV =
  "https://docs.google.com/spreadsheets/d/1hMbIjinGnX8e6CFCpuun8COvCGcZ4d2U4Oh2-21zXb0/export?format=csv&gid=0";

const REVALIDATE = 60;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  row.push(cell);
  rows.push(row);
  return rows;
}

// Sums the "rolls" column of the public sheet, skipping its Total row.
async function getPublicSheetRolls(): Promise<number> {
  const res = await fetch(PUBLIC_SHEET_CSV, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`Public sheet fetch failed: ${res.status}`);
  const rows = parseCsv(await res.text());

  const headerIndex = rows.findIndex((r) => r.some((cell) => /rolls/i.test(cell)));
  if (headerIndex === -1) throw new Error("Public sheet: rolls column not found");
  const col = rows[headerIndex].findIndex((cell) => /rolls/i.test(cell));

  return rows.slice(headerIndex + 1).reduce((sum, r) => {
    if (/^total$/i.test((r[0] ?? "").trim())) return sum;
    const n = parseInt(r[col] ?? "", 10);
    return Number.isFinite(n) && n > 0 ? sum + n : sum;
  }, 0);
}

// Asks the Apps Script for the total on the private Orders tab (numbers only).
async function getFormRolls(): Promise<number> {
  const url = process.env.SLASH_PILE_PAPER_SCRIPT_URL;
  if (!url) return 0;
  const res = await fetch(url, { next: { revalidate: REVALIDATE } });
  const result = await res.json();
  if (!result?.ok || typeof result.rolls !== "number") throw new Error("Unexpected script response");
  return result.rolls;
}

/** Combined rolls ordered across both lists, or null if the public sheet can't be read. */
export async function getTotalRollsOrdered(): Promise<number | null> {
  const [publicRolls, formRolls] = await Promise.allSettled([getPublicSheetRolls(), getFormRolls()]);
  if (publicRolls.status === "rejected") {
    console.error(publicRolls.reason);
    return null;
  }
  if (formRolls.status === "rejected") {
    console.error("Couldn't read form order total", formRolls.reason);
  }
  return publicRolls.value + (formRolls.status === "fulfilled" ? formRolls.value : 0);
}
