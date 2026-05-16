import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [
        { type: "block.pageHero" },
        { type: "block.contactBody" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
