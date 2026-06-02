import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { JOIN_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export const metadata: Metadata = { title: "Join" };
export const revalidate = 60;

export default async function JoinPage() {
  const page = await client.fetch(JOIN_QUERY).catch(() => null);
  const blocks = page?.pageBuilder ?? [];

  return <PageBuilder blocks={blocks} context={{ page: "join" }} />;
}
