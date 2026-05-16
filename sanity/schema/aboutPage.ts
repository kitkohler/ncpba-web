import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [
        { type: "block.pageHero" },
        { type: "block.textMedia" },
        { type: "block.principleCards" },
        { type: "block.teamGrid" },
        { type: "block.advisoryList" },
        { type: "block.fiscalSponsor" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
