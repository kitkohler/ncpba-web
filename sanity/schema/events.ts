import { defineField, defineType } from "sanity";

export const events = defineType({
  name: "events",
  title: "Events",
  type: "document",
  fields: [
    defineField({ name: "comingSoonHeadline", title: "Coming soon headline", type: "string" }),
    defineField({
      name: "comingSoonBody",
      title: "Coming soon body",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "notifyCtaLabel", title: "Notify CTA label", type: "string" }),
    defineField({ name: "notifyCtaHref", title: "Notify CTA href", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Events" }) },
});
