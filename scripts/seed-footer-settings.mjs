/**
 * One-time seed: copy the footer text that used to be hardcoded in
 * components/Footer.tsx into the Site Settings document, so editors see
 * the real values in the studio instead of empty fields.
 *
 * Only fills fields that are empty — anything already edited in the studio
 * is left alone. Safe to re-run.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<token> node scripts/seed-footer-settings.mjs
 *
 * Get a write token from:
 *   sanity.io/manage → project 2r7xt8dx → API → Tokens → Add API Token (Editor)
 */

import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("❌  SANITY_API_WRITE_TOKEN environment variable is required.");
  process.exit(1);
}

const client = createClient({
  projectId: "2r7xt8dx",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function key(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function link(label, href) {
  return { _type: "footerLink", _key: key("link"), label, href };
}

function column(title, links) {
  return { _type: "footerColumn", _key: key("col"), title, links };
}

const FOOTER_DEFAULTS = {
  footerTagline: "Good Fire with Neighbors · Safely, Legally, Responsibly",
  footerEmail: "info@nevadacountypba.org",
  footerLocation: "Nevada County, CA",
  footerJoinLabel: "Join the NCPBA Community",
  footerColumns: [
    column("Organization", [
      link("About", "/about"),
      link("How It Works", "/how-it-works"),
      link("Join", "/join"),
      link("Contact", "/contact"),
    ]),
    column("Prescribed Fire", [
      link("What is RxFire?", "/how-it-works"),
      link("For Landowners", "/how-it-works"),
      link("For Volunteers", "/how-it-works"),
      link("FAQs", "/how-it-works"),
    ]),
    column("Connect", [
      link("Events", "/events"),
      link("News", "/news"),
      link("Get Involved", "/join"),
      link("Mailing List", "https://lp.constantcontactpages.com/sl/Uj88TTf"),
    ]),
  ],
  footerCopyright: "Nevada County Prescribed Burn Association · A fiscally sponsored project of NCRCD",
  footerBottomLinks: [link("Contact", "/contact")],
};

async function main() {
  await client.createIfNotExists({ _id: "siteSettings", _type: "siteSettings" });
  const before = await client.getDocument("siteSettings");

  await client.patch("siteSettings").setIfMissing(FOOTER_DEFAULTS).commit();

  // The studio shows unpublished edits from the draft, so fill that too if there is one
  if (await client.getDocument("drafts.siteSettings")) {
    await client.patch("drafts.siteSettings").setIfMissing(FOOTER_DEFAULTS).commit();
  }

  for (const field of Object.keys(FOOTER_DEFAULTS)) {
    console.log(before?.[field] == null ? `✅  ${field} filled` : `⏭️   ${field} already set — left as is`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
