import { defineField, defineType } from "sanity";

export const blockVolunteerSplit = defineType({
  name: "block.volunteerSplit",
  title: "Volunteer Split",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "bodyParagraphs",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "whatTheyDo",
      title: "What Volunteers Do",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whatTheyGet",
      title: "What Volunteers Get",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
  ],
  preview: { select: { title: "heading" } },
});
