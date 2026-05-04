import { defineField, defineType } from "sanity";

export const joinPage = defineType({
  name: "joinPage",
  title: "Join Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "overline", title: "Overline", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "subhead", title: "Subhead", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "emailSignupHeading",
      title: "Email Signup Heading",
      type: "string",
    }),
    defineField({
      name: "emailSignupBody",
      title: "Email Signup Body",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: "Join Page" }) },
});
