import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
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
        defineField({ name: "ctaLabel", title: "Primary CTA Label", type: "string" }),
        defineField({ name: "ctaHref", title: "Primary CTA Href", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
        defineField({ name: "secondaryCtaHref", title: "Secondary CTA Href", type: "string" }),
        defineField({
          name: "backgroundType",
          title: "Background Type",
          type: "string",
          options: {
            list: [
              { title: "Gradient", value: "gradient" },
              { title: "Image", value: "image" },
              { title: "Video", value: "video" },
            ],
          },
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({ name: "backgroundVideoUrl", title: "Background Video URL", type: "url" }),
      ],
    }),
    defineField({
      name: "whatWeDoSection",
      title: "What We Do Section",
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
      name: "whereWeWorkSection",
      title: "Where We Work Section",
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
      name: "howItWorksTeaserSection",
      title: "How It Works Teaser Header",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
      ],
    }),
    defineField({
      name: "howItWorksTeaserSteps",
      title: "How It Works Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "n", title: "Step Number (e.g. 01)", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "n" } },
        },
      ],
    }),
    defineField({
      name: "ctaStrip",
      title: "CTA Strip",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
