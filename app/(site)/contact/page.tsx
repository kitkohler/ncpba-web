import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export const metadata: Metadata = { title: "Contact" };
export const revalidate = 60;

const FALLBACK_BLOCKS = [
  {
    _type: "block.pageHero",
    _key: "hero",
    overline: "Contact",
    headline: "Get in touch.",
    subhead: "Questions about burns, volunteering, landowner participation, or partnership. We're a small organization and we read everything.",
  },
  {
    _type: "block.contactBody",
    _key: "contactBody",
    email: "info@nevadacountypba.org",
    location: "Nevada County, California",
  },
];

export default async function ContactPage() {
  const page = await client.fetch(CONTACT_QUERY).catch(() => null);
  const blocks = page?.pageBuilder?.length ? page.pageBuilder : FALLBACK_BLOCKS;

  return <PageBuilder blocks={blocks} context={{ page: "contact" }} />;
}
