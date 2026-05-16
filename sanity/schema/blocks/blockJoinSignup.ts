import { defineField, defineType } from "sanity";

export const blockJoinSignup = defineType({
  name: "block.joinSignup",
  title: "Join Signup",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "heading" } },
});
