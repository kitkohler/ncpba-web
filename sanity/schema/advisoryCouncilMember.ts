import { defineField, defineType } from "sanity";

export const advisoryCouncilMember = defineType({
  name: "advisoryCouncilMember",
  title: "Advisory Council Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation / Note",
      type: "string",
      description: "Organization or brief descriptor shown below the name",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "affiliation" },
  },
});
