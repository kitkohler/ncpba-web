/**
 * Read and answer Website Requests that editors file in the studio.
 * Used by Kit's /ncpba-requests Claude skill.
 *
 * Usage (the token is read from .env.local, never passed on the command line):
 *   node --env-file=.env.local scripts/site-requests.mjs list            # open + question requests
 *   node --env-file=.env.local scripts/site-requests.mjs list --all      # every request
 *   node --env-file=.env.local scripts/site-requests.mjs reply <id> [--status <status>] <<'EOF'
 *   Note text for the editor
 *   EOF
 *   node --env-file=.env.local scripts/site-requests.mjs status <id> <status>
 *
 * Statuses: new, working, question, done, wontdo
 *
 * Needs SANITY_API_WRITE_TOKEN (Editor) in .env.local:
 *   sanity.io/manage → project 2r7xt8dx → API → Tokens → Add API Token (Editor)
 */

import { createClient } from "@sanity/client";

const STATUSES = ["new", "working", "question", "done", "wontdo"];
const REPLY_AUTHOR = "Claude (for Kit)";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("❌  SANITY_API_WRITE_TOKEN is missing. Add it to .env.local and run with --env-file=.env.local.");
  process.exit(1);
}

const client = createClient({
  projectId: "2r7xt8dx",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
  perspective: "raw",
});

function key() {
  return `note-${Math.random().toString(36).slice(2, 10)}`;
}

async function readStdin() {
  if (process.stdin.isTTY) return "";
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8").trim();
}

async function list(all) {
  const docs = await client.fetch(
    `*[_type == "siteRequest"] | order(_createdAt asc) {
      _id, _createdAt, _updatedAt, summary, where, pageUrl, details, submittedBy, status,
      "screenshots": screenshots[].asset->url,
      conversation[]{ author, postedAt, text }
    }`
  );

  // Requests normally exist only as drafts; if both versions exist, keep the draft
  const byId = new Map();
  for (const doc of docs) {
    const baseId = doc._id.replace(/^drafts\./, "");
    if (!byId.has(baseId) || doc._id.startsWith("drafts.")) byId.set(baseId, doc);
  }

  const requests = [...byId.values()].filter(
    (r) => all || !["done", "wontdo"].includes(r.status)
  );
  console.log(JSON.stringify(requests, null, 2));
}

async function patch(id, { status, text }) {
  if (status && !STATUSES.includes(status)) {
    console.error(`❌  Unknown status "${status}". Use one of: ${STATUSES.join(", ")}`);
    process.exit(1);
  }
  if (!(await client.getDocument(id))) {
    console.error(`❌  No document with id ${id}`);
    process.exit(1);
  }

  let p = client.patch(id);
  if (status) p = p.set({ status });
  if (text) {
    p = p.setIfMissing({ conversation: [] }).append("conversation", [
      { _type: "requestNote", _key: key(), author: REPLY_AUTHOR, postedAt: new Date().toISOString(), text },
    ]);
  }
  await p.commit();
  console.log(`✅  Updated ${id}${status ? ` (status: ${status})` : ""}${text ? " with a reply" : ""}`);
}

async function main() {
  const [command, id, ...rest] = process.argv.slice(2);

  if (command === "list") return list(process.argv.includes("--all"));

  if (command === "reply" && id) {
    const statusIdx = rest.indexOf("--status");
    const status = statusIdx >= 0 ? rest[statusIdx + 1] : undefined;
    const text = await readStdin();
    if (!text) {
      console.error("❌  Pipe the reply text in on stdin.");
      process.exit(1);
    }
    return patch(id, { status, text });
  }

  if (command === "status" && id && rest[0]) return patch(id, { status: rest[0] });

  console.error("Usage: site-requests.mjs list [--all] | reply <id> [--status <s>] < text | status <id> <s>");
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
