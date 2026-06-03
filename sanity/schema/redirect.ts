import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "From",
      type: "string",
      description: 'Path to redirect from — must start with / (e.g. /old-page)',
      validation: (R) =>
        R.required().custom((val) => {
          if (val && !val.startsWith("/")) return 'Path must start with /';
          return true;
        }),
    }),
    defineField({
      name: "destination",
      title: "To",
      type: "string",
      description: "URL or path to redirect to (e.g. https://example.com or /new-page)",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "permanent",
      title: "Permanent redirect (308)",
      type: "boolean",
      description:
        "Permanent redirects are cached by browsers — use for destinations that won't change. Uncheck for temporary (307).",
      initialValue: true,
    }),
  ],
  preview: {
    select: { source: "source", destination: "destination", permanent: "permanent" },
    prepare({ source, destination, permanent }) {
      return {
        title: source ?? "(no source)",
        subtitle: `→ ${destination ?? "(no destination)"}  ·  ${permanent ? "308 permanent" : "307 temporary"}`,
      };
    },
  },
});
