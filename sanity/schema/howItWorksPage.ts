import { defineField, defineType } from "sanity";

export const howItWorksPage = defineType({
  name: "howItWorksPage",
  title: "How It Works Page",
  type: "document",
  fields: [
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [
        { type: "block.pageHero" },
        { type: "block.textMedia" },
        { type: "block.stepCards" },
        { type: "block.volunteerSplit" },
        { type: "block.faqSection" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "How It Works Page" }) },
});
