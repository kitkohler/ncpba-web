import { defineField, defineType } from "sanity";

export const blockStepCards = defineType({
  name: "block.stepCards",
  title: "Step Cards",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid (number cards)", value: "grid" },
          { title: "List (vertical numbered list)", value: "list" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "n", title: "Step Number (e.g. 01 or 1)", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "n" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "heading" } },
});
