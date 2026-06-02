/**
 * Migration: convert boardMember.bio from plain string → Portable Text array.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<token> node scripts/migrate-bio-to-portable-text.mjs
 *
 * Get a write token from:
 *   sanity.io/manage → project 2r7xt8dx → API → Tokens → Add API Token (Editor)
 */

import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("❌  SANITY_API_WRITE_TOKEN environment variable is required.");
  console.error("    Get one at: https://sanity.io/manage → project 2r7xt8dx → API → Tokens");
  process.exit(1);
}

const client = createClient({
  projectId: "2r7xt8dx",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

/** Convert a plain string into a single-paragraph Portable Text block array. */
function stringToBlocks(text) {
  // Split on double newlines to preserve any paragraph breaks the author typed
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length === 0) return [];

  return paragraphs.map((para, i) => ({
    _type: "block",
    _key: `bio-para-${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `bio-span-${i}`, text: para, marks: [] }],
  }));
}

async function run() {
  // Fetch all board members whose bio is currently a string
  const members = await client.fetch(
    `*[_type == "boardMember" && defined(bio) && string::startsWith(bio, "")]{ _id, name, bio }`
  );

  // Filter to only those where bio is actually a string (not already an array)
  const toMigrate = members.filter((m) => typeof m.bio === "string" && m.bio.trim().length > 0);

  if (toMigrate.length === 0) {
    console.log("✅  No string bios found — nothing to migrate.");
    return;
  }

  console.log(`Found ${toMigrate.length} board member(s) with string bios:\n`);
  for (const member of toMigrate) {
    console.log(`  → ${member.name}`);
  }
  console.log();

  for (const member of toMigrate) {
    const blocks = stringToBlocks(member.bio);
    await client
      .patch(member._id)
      .set({ bio: blocks })
      .commit();
    console.log(`✅  Migrated: ${member.name}`);
  }

  console.log("\n🎉  Migration complete. Refresh your Sanity Studio to confirm.");
}

run().catch((err) => {
  console.error("❌  Migration failed:", err.message);
  process.exit(1);
});
