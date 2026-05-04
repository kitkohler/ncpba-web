import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "subhead", title: "Subhead", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "missionVision",
      title: "Who We Are Section",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text" }],
        }),
      ],
    }),
    defineField({
      name: "howWeWorkSection",
      title: "How We Work Section Header",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
      ],
    }),
    defineField({
      name: "howWeWorkPrinciples",
      title: "Principles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "teamSection",
      title: "Team Section Header",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
      ],
    }),
    defineField({
      name: "advisorySection",
      title: "Advisory Council Section Header",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "fiscalSponsorBody",
      title: "Fiscal Sponsor Body",
      type: "text",
      rows: 4,
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
