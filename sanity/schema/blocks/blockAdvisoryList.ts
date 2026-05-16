import { defineField, defineType } from "sanity";

export const blockAdvisoryList = defineType({
  name: "block.advisoryList",
  title: "Advisory List",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "overline" } },
});
