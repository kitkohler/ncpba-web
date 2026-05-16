import { defineField, defineType } from "sanity";

export const joinPage = defineType({
  name: "joinPage",
  title: "Join Page",
  type: "document",
  fields: [
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [
        { type: "block.pageHero" },
        { type: "block.joinSignup" },
        { type: "block.emailSignup" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Join Page" }) },
});
