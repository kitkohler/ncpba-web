import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";
import type { BoardMember, AdvisoryMember } from "@/components/PageBuilder";

export const metadata: Metadata = { title: "About" };
export const revalidate = 60;

export default async function AboutPage() {
  const data = await client.fetch(ABOUT_QUERY).catch(() => ({}));

  const boardMembers: BoardMember[] = data?.boardMembers ?? [];
  const advisoryMembers: AdvisoryMember[] = data?.advisoryMembers ?? [];
  const blocks = data?.page?.pageBuilder ?? [];

  return (
    <PageBuilder
      blocks={blocks}
      context={{ boardMembers, advisoryMembers, page: "about" }}
    />
  );
}
