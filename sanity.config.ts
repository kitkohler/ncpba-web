import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import type { StructureResolver } from "sanity/structure";
import { schemaTypes } from "@/sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const requestList = (S: Parameters<StructureResolver>[0], title: string, filter: string) =>
  S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .schemaType("siteRequest")
        .filter(`_type == "siteRequest" && (${filter})`)
        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        .initialValueTemplates([S.initialValueTemplateItem("siteRequest")])
    );

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Website Requests")
        .child(
          S.list()
            .title("Website Requests")
            .items([
              requestList(S, "Open", `status in ["new", "working"] || !defined(status)`),
              requestList(S, "Questions for you", `status == "question"`),
              requestList(S, "Done & closed", `status in ["done", "wontdo"]`),
              S.divider(),
              requestList(S, "All requests", "true"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home")
                .child(S.document().schemaType("homePage").documentId("homePage")),
              S.listItem()
                .title("About")
                .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
              S.listItem()
                .title("How It Works")
                .child(
                  S.document().schemaType("howItWorksPage").documentId("howItWorksPage")
                ),
              S.listItem()
                .title("Join")
                .child(S.document().schemaType("joinPage").documentId("joinPage")),
              S.listItem()
                .title("Contact")
                .child(S.document().schemaType("contactPage").documentId("contactPage")),
              S.listItem()
                .title("Events")
                .child(S.document().schemaType("events").documentId("events")),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("newsPost").title("News Posts"),
      S.divider(),
      S.listItem()
        .title("People")
        .child(
          S.list()
            .title("People")
            .items([
              S.documentTypeListItem("boardMember").title("Board Members"),
              S.documentTypeListItem("advisoryCouncilMember").title("Advisory Council"),
            ])
        ),
      S.documentTypeListItem("manualEvent").title("Manual Events"),
      S.documentTypeListItem("partner").title("Partners"),
      S.documentTypeListItem("faqItem").title("FAQ Items"),
      S.divider(),
      S.documentTypeListItem("redirect").title("Redirects"),
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);

export default defineConfig({
  name: "ncpba",
  title: "NCPBA",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Website requests stay as drafts so they aren't readable through the public dataset API
    actions: (prev, { schemaType }) =>
      schemaType === "siteRequest"
        ? prev.filter(({ action }) => action !== "publish" && action !== "unpublish")
        : prev,
  },
});
