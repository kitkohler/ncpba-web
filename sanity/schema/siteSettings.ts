import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
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
      name: "signupUrl",
      title: "Signup URL",
      type: "url",
      description: "Destination for /signup — overrides the hardcoded fallback in next.config.mjs. Leave blank to use the default.",
    }),
    defineField({ name: "facebookUrl",  title: "Facebook URL",  type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "linkedinUrl",  title: "LinkedIn URL",  type: "url" }),
    defineField({ name: "youtubeUrl",   title: "YouTube URL",   type: "url" }),
    defineField({ name: "nextdoorUrl",  title: "Nextdoor URL",  type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
