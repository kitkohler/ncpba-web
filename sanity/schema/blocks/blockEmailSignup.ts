import { defineField, defineType } from "sanity";

export const blockEmailSignup = defineType({
  name: "block.emailSignup",
  title: "Email Signup",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({
      name: "ctaHref",
      title: "CTA Href",
      type: "url",
      description: "URL for the mailing list sign-up page.",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      options: {
        list: [
          { title: "Sand", value: "sand" },
          { title: "Warm Cream", value: "warm-cream" },
        ],
        layout: "radio",
      },
      initialValue: "sand",
    }),
  ],
  preview: { select: { title: "heading" } },
});
