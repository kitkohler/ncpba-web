import { defineField, defineType } from "sanity";

export const blockTextMedia = defineType({
  name: "block.textMedia",
  title: "Text + Media",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({
      name: "overlineColor",
      title: "Overline Color",
      type: "string",
      options: {
        list: [
          { title: "Ember", value: "ember" },
          { title: "Sage", value: "sage" },
          { title: "Smoke", value: "smoke" },
        ],
        layout: "radio",
      },
      initialValue: "sage",
    }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
    defineField({
      name: "ctaVariant",
      title: "CTA Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "mediaPosition",
      title: "Media Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "right",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      options: {
        list: [
          { title: "Warm Cream", value: "warm-cream" },
          { title: "Sand", value: "sand" },
          { title: "Deep Soil", value: "deep-soil" },
        ],
        layout: "radio",
      },
      initialValue: "warm-cream",
    }),
  ],
  preview: { select: { title: "heading" } },
});
