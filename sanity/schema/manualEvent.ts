import { defineField, defineType } from "sanity";

export const manualEvent = defineType({
  name: "manualEvent",
  title: "Manual Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "event_type",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Community", value: "community" },
          { title: "Meetup", value: "meetup" },
          { title: "Training", value: "training" },
          { title: "Workshop", value: "workshop" },
          { title: "Burn Day", value: "burn_day" },
        ],
      },
    }),
    defineField({
      name: "starts_at",
      title: "Start Date & Time",
      type: "datetime",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "ends_at",
      title: "End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "location_public",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "rsvp_url",
      title: "RSVP / Ticket URL",
      type: "url",
      description: "Link to Eventbrite page or any external registration URL",
    }),
  ],
  preview: {
    select: {
      title: "title",
      starts_at: "starts_at",
      event_type: "event_type",
    },
    prepare({ title, starts_at, event_type }) {
      const date = starts_at
        ? new Date(starts_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "No date";
      return { title, subtitle: `${date}${event_type ? ` · ${event_type}` : ""}` };
    },
  },
});
