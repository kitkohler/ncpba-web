import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { JOIN_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export const metadata: Metadata = { title: "Join" };
export const revalidate = 60;

const FALLBACK_BLOCKS = [
  {
    _type: "block.pageHero",
    _key: "hero",
    overline: "Join NCPBA",
    headline: "Good fire takes good neighbors.",
    subhead: "NCPBA is a community you join, not a service you hire. Here's how to become part of it.",
  },
  {
    _type: "block.joinSignup",
    _key: "joinSignup",
  },
  {
    _type: "block.emailSignup",
    _key: "emailSignup",
    overline: "Stay in the Loop",
    heading: "Not ready to jump in yet?",
    body: "Sign up for occasional updates on burns, training opportunities, and NCPBA news.",
    ctaLabel: "Join the mailing list",
    ctaHref: "https://lp.constantcontactpages.com/sl/Uj88TTf",
    backgroundColor: "sand",
  },
];

export default async function JoinPage() {
  const page = await client.fetch(JOIN_QUERY).catch(() => null);
  const blocks = page?.pageBuilder?.length ? page.pageBuilder : FALLBACK_BLOCKS;

  return <PageBuilder blocks={blocks} context={{ page: "join" }} />;
}
