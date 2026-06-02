import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { HOW_IT_WORKS_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export const metadata: Metadata = { title: "How It Works" };
export const revalidate = 60;

export default async function HowItWorksPage() {
  const page = await client.fetch(HOW_IT_WORKS_QUERY).catch(() => null);
  const blocks = page?.pageBuilder ?? [];

  return <PageBuilder blocks={blocks} context={{ page: "how-it-works" }} />;
}
