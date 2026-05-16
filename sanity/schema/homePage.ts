import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [
        { type: "block.hero" },
        { type: "block.textMedia" },
        { type: "block.stepCards" },
        { type: "block.ctaStrip" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
