import { NextResponse } from "next/server";

// Google Apps Script web app bound to the private orders sheet.
// See scripts/slash-pile-paper-order.gs for setup.
const SCRIPT_URL = process.env.SLASH_PILE_PAPER_SCRIPT_URL;

const MAX_ROLLS = 100;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!SCRIPT_URL) {
    console.error("SLASH_PILE_PAPER_SCRIPT_URL is not set");
    return NextResponse.json({ error: "Orders aren't being accepted right now." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real visitors never see or fill this field
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const order = {
    name: clean(body.name, 200),
    email: clean(body.email, 200),
    phone: clean(body.phone, 50),
    rolls: Number(body.rolls),
    joinNcpba: body.joinNcpba === true,
    notes: clean(body.notes, 2000),
  };

  if (!order.name || !/^\S+@\S+\.\S+$/.test(order.email)) {
    return NextResponse.json({ error: "Please enter your name and a valid email." }, { status: 400 });
  }
  if (!Number.isInteger(order.rolls) || order.rolls < 1 || order.rolls > MAX_ROLLS) {
    return NextResponse.json({ error: `Number of rolls must be between 1 and ${MAX_ROLLS}.` }, { status: 400 });
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      cache: "no-store",
    });
    const text = await res.text();
    let result: { ok?: boolean } | null = null;
    try {
      result = JSON.parse(text);
    } catch {}
    if (!res.ok || !result?.ok) {
      console.error("Order sheet rejected submission", res.status, result ?? text.slice(0, 500));
      throw new Error("Sheet write failed");
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong saving your order. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
