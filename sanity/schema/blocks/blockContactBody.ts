import { defineField, defineType } from "sanity";

export const blockContactBody = defineType({
  name: "block.contactBody",
  title: "Contact Body",
  type: "object",
  fields: [
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
  ],
  preview: { select: { title: "email" } },
});
