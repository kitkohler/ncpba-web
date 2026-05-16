import { defineField, defineType } from "sanity";

export const blockFaqSection = defineType({
  name: "block.faqSection",
  title: "FAQ Section",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faqItem" }] }],
      description: "Select and order FAQ items. Create FAQ Items in the FAQ Items section first.",
    }),
  ],
  preview: { select: { title: "heading" } },
});
