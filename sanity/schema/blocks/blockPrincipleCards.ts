import { defineField, defineType } from "sanity";

export const blockPrincipleCards = defineType({
  name: "block.principleCards",
  title: "Principle Cards",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      options: {
        list: [
          { title: "Warm Cream", value: "warm-cream" },
          { title: "Sand", value: "sand" },
        ],
        layout: "radio",
      },
      initialValue: "sand",
    }),
    defineField({
      name: "principles",
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
  ],
  preview: { select: { title: "heading" } },
});
