import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export const metadata: Metadata = { title: "Contact" };
export const revalidate = 60;

export default async function ContactPage() {
  const page = await client.fetch(CONTACT_QUERY).catch(() => null);
  const blocks = page?.pageBuilder ?? [];

  return <PageBuilder blocks={blocks} context={{ page: "contact" }} />;
}
