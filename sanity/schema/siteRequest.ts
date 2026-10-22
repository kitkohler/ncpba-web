import { defineArrayMember, defineField, defineType } from "sanity";

// Website change requests from editors. Kit's assistant (Claude) reads these,
// replies in the conversation, and updates the status.
//
// Requests are never published (the Publish action is removed in sanity.config.ts),
// so they stay as drafts, which the public dataset API doesn't expose.

export const REQUEST_STATUSES = [
  { title: "🆕 New", value: "new" },
  { title: "🔧 Working on it", value: "working" },
  { title: "❓ Question for you", value: "question" },
  { title: "✅ Done", value: "done" },
  { title: "🚫 Won't do", value: "wontdo" },
];

const PLACES = [
  { title: "Home", value: "home" },
  { title: "About", value: "about" },
  { title: "How It Works", value: "how-it-works" },
  { title: "Join", value: "join" },
  { title: "Contact", value: "contact" },
  { title: "Events", value: "events" },
  { title: "News", value: "news" },
  { title: "Footer", value: "footer" },
  { title: "Top menu", value: "menu" },
  { title: "Whole site", value: "site" },
  { title: "Other", value: "other" },
];

export const siteRequest = defineType({
  name: "siteRequest",
  title: "Website Request",
  type: "document",
  fields: [
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      description: "One line, e.g. “Fix typo in About page intro”",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "where",
      title: "Where on the site?",
      type: "string",
      options: { list: PLACES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageUrl",
      title: "Page link (optional)",
      type: "url",
      description: "Paste the address of the page if it helps",
    }),
    defineField({
      name: "details",
      title: "What should change?",
      type: "text",
      rows: 6,
      description:
        "Be specific: paste the current wording and the new wording, or describe what looks wrong.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "screenshots",
      title: "Screenshots (optional)",
      type: "array",
      of: [defineArrayMember({ type: "image" })],
    }),
    defineField({
      name: "submittedBy",
      title: "Submitted by",
      type: "string",
      readOnly: true,
      initialValue: (_params, { currentUser }) => currentUser?.name ?? currentUser?.email ?? "",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: REQUEST_STATUSES, layout: "radio" },
      initialValue: "new",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "conversation",
      title: "Conversation",
      type: "array",
      description: "Replies and questions about this request. Add a note to answer a question.",
      of: [
        defineArrayMember({
          name: "requestNote",
          title: "Note",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Note", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
            defineField({
              name: "author",
              title: "From",
              type: "string",
              readOnly: true,
              initialValue: (_params, { currentUser }) => currentUser?.name ?? currentUser?.email ?? "",
            }),
            defineField({
              name: "postedAt",
              title: "Posted",
              type: "datetime",
              readOnly: true,
              initialValue: () => new Date().toISOString(),
            }),
          ],
          preview: {
            select: { title: "text", author: "author", postedAt: "postedAt" },
            prepare: ({ title, author, postedAt }) => ({
              title,
              subtitle: [author, postedAt && new Date(postedAt).toLocaleString()].filter(Boolean).join(" · "),
            }),
          },
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Newest first", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "summary", status: "status", where: "where", submittedBy: "submittedBy" },
    prepare: ({ title, status, where, submittedBy }) => {
      const statusTitle = REQUEST_STATUSES.find((s) => s.value === status)?.title ?? "";
      const place = PLACES.find((p) => p.value === where)?.title;
      return {
        title,
        subtitle: [statusTitle, place, submittedBy].filter(Boolean).join(" · "),
      };
    },
  },
});
