import { defineField, defineType } from "sanity";

export const howItWorksPage = defineType({
  name: "howItWorksPage",
  title: "How It Works Page",
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
      name: "introSection",
      title: "The Model Section Header",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
      ],
    }),
    defineField({
      name: "landOwnerSection",
      title: "Landowner Section Header",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
      ],
    }),
    defineField({
      name: "volunteerSection",
      title: "Volunteer Section Header",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
      ],
    }),
    defineField({
      name: "faqSection",
      title: "FAQ Section Header",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faqItem" }] }],
      description: "Select and order FAQ items. Create FAQ Items in the FAQ Items section first.",
    }),
  ],
  preview: { prepare: () => ({ title: "How It Works Page" }) },
});
