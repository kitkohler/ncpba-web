import PageHeroBase from "@/components/PageHero";

interface Props {
  overline?: string;
  headline?: string;
  subhead?: string;
  /** Which page's defaults to use when Sanity fields are empty */
  page?: "about" | "how-it-works" | "join" | "contact";
}

const DEFAULTS: Record<string, { overline: string; headline: string; subhead: string }> = {
  about: {
    overline: "About NCPBA",
    headline: "We're your neighbors. And we're tired of watching things burn.",
    subhead:
      "NCPBA was built by people who live here, work this land, and understand what's at stake if we don't bring good fire back to the Sierra Nevada foothills.",
  },
  "how-it-works": {
    overline: "The Model",
    headline: "This is the barn-raising model. Applied to fire.",
    subhead:
      "When it's your burn day, the community shows up for you. When it's your neighbor's burn day, you show up for them. That's how a burn association works.",
  },
  join: {
    overline: "Join NCPBA",
    headline: "Good fire takes good neighbors.",
    subhead: "NCPBA is a community you join, not a service you hire. Here's how to become part of it.",
  },
  contact: {
    overline: "Contact",
    headline: "Get in touch.",
    subhead:
      "Questions about burns, volunteering, landowner participation, or partnership. We're a small organization and we read everything.",
  },
};

export default function PageHeroBlock(props: Props) {
  const fallback = DEFAULTS[props.page ?? "about"] ?? DEFAULTS.about;
  return (
    <PageHeroBase
      overline={props.overline ?? fallback.overline}
      headline={props.headline ?? fallback.headline}
      subhead={props.subhead ?? fallback.subhead}
    />
  );
}
