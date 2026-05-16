import { defineField, defineType } from "sanity";

export const blockCtaStrip = defineType({
  name: "block.ctaStrip",
  title: "CTA Strip",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
    defineField({ name: "ctaLabel", title: "Primary CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "Primary CTA Href", type: "string" }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Ember (orange background)", value: "ember" },
          { title: "Deep Soil (dark background)", value: "deep-soil" },
        ],
        layout: "radio",
      },
      initialValue: "deep-soil",
    }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
    defineField({ name: "secondaryCtaHref", title: "Secondary CTA Href", type: "string" }),
  ],
  preview: { select: { title: "headline" } },
});
