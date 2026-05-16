import { defineField, defineType } from "sanity";
import { SliderInput } from "../../components/SliderInput";

export const blockHero = defineType({
  name: "block.hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "overline", title: "Overline", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subhead", title: "Subhead", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "Primary CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "Primary CTA Href", type: "string" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
    defineField({ name: "secondaryCtaHref", title: "Secondary CTA Href", type: "string" }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Used when no video URL is set.",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "backgroundVideoUrl",
      title: "Background Video URL",
      type: "url",
      description: "When set, the video plays behind content instead of the image.",
    }),
    defineField({
      name: "overlayOpacity",
      title: "Overlay Opacity",
      type: "number",
      initialValue: 50,
      description: "Dark overlay strength (0 = none, 100 = fully dark). Keeps text readable over busy backgrounds.",
      validation: (Rule) => Rule.min(0).max(100),
      components: { input: SliderInput },
    }),
  ],
  preview: { select: { title: "headline" } },
});
