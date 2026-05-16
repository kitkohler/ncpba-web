import { defineField, defineType } from "sanity";

export const blockTeamGrid = defineType({
  name: "block.teamGrid",
  title: "Team Grid",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
  ],
  preview: { select: { title: "heading" } },
});
