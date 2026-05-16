import { defineField, defineType } from "sanity";

export const blockPageHero = defineType({
  name: "block.pageHero",
  title: "Page Hero",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subhead", title: "Subhead", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "headline" } },
});
