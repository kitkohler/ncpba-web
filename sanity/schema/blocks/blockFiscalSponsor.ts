import { defineField, defineType } from "sanity";

export const blockFiscalSponsor = defineType({
  name: "block.fiscalSponsor",
  title: "Fiscal Sponsor",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 5 }),
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
  ],
  preview: { select: { title: "overline" } },
});
