import { defineArrayMember, defineField, defineType, type StringRule } from "sanity";

const linkHrefValidation = (Rule: StringRule) =>
  Rule.required().custom((value) => {
    if (!value) return true;
    return /^(\/|https?:\/\/|mailto:)/.test(value)
      ? true
      : "Start with / for a page on this site, or https:// for another website";
  });

const footerLink = defineArrayMember({
  name: "footerLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "A page on this site like /about, or a full URL like https://example.org",
      validation: linkHrefValidation,
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fieldsets: [
    { name: "footer", title: "Footer", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: "announcementEnabled",
      title: "Show Announcement Banner",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "announcementText",
      title: "Announcement Text",
      type: "string",
      description: "Short message shown in the sitewide banner strip",
    }),
    defineField({
      name: "announcementHref",
      title: "Announcement Link",
      type: "string",
      description: "URL the banner links to — use /events to link to the events page",
    }),
    defineField({
      name: "announcementExpiresAt",
      title: "Hide Banner After",
      type: "datetime",
      description: "The banner automatically stops showing at this date and time.",
      hidden: ({ document }) => !document?.announcementEnabled,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!context.document?.announcementEnabled) return true;
          if (!value) return "Choose when the banner should stop showing";
          if (new Date(value as string) <= new Date()) {
            return { message: "This date has passed — the banner won't be shown", level: "warning" };
          }
          return true;
        }),
    }),
    defineField({
      name: "signupUrl",
      title: "Signup URL",
      type: "url",
      description: "Destination for /signup — overrides the default (the /jointhepba page). Leave blank to use the default.",
    }),
    defineField({
      name: "footerTagline",
      title: "Tagline",
      type: "string",
      description: "Small line under “Nevada County PBA” next to the logo",
      fieldset: "footer",
    }),
    defineField({ name: "footerEmail",    title: "Email",    type: "string", fieldset: "footer" }),
    defineField({ name: "footerLocation", title: "Location", type: "string", fieldset: "footer" }),
    defineField({
      name: "footerJoinLabel",
      title: "Join Button Label",
      type: "string",
      description: "The button always links to the Underburn join page",
      fieldset: "footer",
    }),
    defineField({ name: "facebookUrl",  title: "Facebook URL",  type: "url", fieldset: "footer" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url", fieldset: "footer" }),
    defineField({ name: "linkedinUrl",  title: "LinkedIn URL",  type: "url", fieldset: "footer" }),
    defineField({ name: "youtubeUrl",   title: "YouTube URL",   type: "url", fieldset: "footer" }),
    defineField({ name: "nextdoorUrl",  title: "Nextdoor URL",  type: "url", fieldset: "footer" }),
    defineField({
      name: "footerColumns",
      title: "Link Columns",
      type: "array",
      description: "Up to 3 columns of links",
      fieldset: "footer",
      validation: (Rule) => Rule.max(3),
      of: [
        defineArrayMember({
          name: "footerColumn",
          title: "Column",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Column Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "links", title: "Links", type: "array", of: [footerLink] }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "footerCopyright",
      title: "Copyright Line",
      type: "string",
      description: "“© ” and the current year are added automatically in front of this",
      fieldset: "footer",
    }),
    defineField({
      name: "footerBottomLinks",
      title: "Bottom Bar Links",
      type: "array",
      description: "Small links at the very bottom right",
      fieldset: "footer",
      of: [footerLink],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
