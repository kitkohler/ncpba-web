import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";
import type { BoardMember, AdvisoryMember } from "@/components/PageBuilder";

export const metadata: Metadata = { title: "About" };
export const revalidate = 60;

function textBlock(text: string): any[] {
  return [{ _type: "block", _key: "b", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s", text, marks: [] }] }];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COPY_BOARD: BoardMember[] = [
  { _id: "fallback-1", name: "Kit [Last Name]", role: "President & Founder", bio: textBlock("[Bio — 2–3 sentences, personal and place-based]") },
  { _id: "fallback-2", name: "Theo Fitanides", role: "Vice President", bio: textBlock("[Bio — 2–3 sentences]") },
  { _id: "fallback-3", name: "Jennifer Rain Crosby", role: "Board Member", bio: textBlock("[Bio — 2–3 sentences]") },
];

const COPY_ADVISORY: AdvisoryMember[] = [
  { _id: "adv-1", name: "Alex Geritz", note: "Nevada County" },
  { _id: "adv-2", name: "Dario Davidson", note: "" },
  { _id: "adv-3", name: "Jo Ann Fites-Kaufman", note: "Wildfire Safe Coalition of Nevada County" },
  { _id: "adv-4", name: "Haley Coopergard", note: "Fire Educator, Nevada County Resource Conservation District" },
];

const FALLBACK_BLOCKS = [
  {
    _type: "block.pageHero",
    _key: "hero",
    overline: "About NCPBA",
    headline: "We're your neighbors. And we're tired of watching things burn.",
    subhead: "NCPBA was built by people who live here, work this land, and understand what's at stake if we don't bring good fire back to the Sierra Nevada foothills.",
  },
  {
    _type: "block.textMedia",
    _key: "whoWeAre",
    overline: "Who We Are",
    overlineColor: "sage",
    heading: "Built from the ground up. By the community, for the community.",
    paragraphs: [
      "The Nevada County Prescribed Burn Association was founded on a simple conviction: the people who live on this land are the ones best positioned to steward it. Not outside crews. Not distant agencies. Neighbors.",
      "Prescribed fire is one of the most effective tools we have for reducing catastrophic wildfire risk and restoring ecological health to fire-adapted landscapes. But using it safely and legally takes coordination, equipment, trained hands, and trust. That's what NCPBA exists to provide.",
      "We're a community of landowners and volunteers who show up for each other's burns, share knowledge and equipment, and work in close partnership with CAL FIRE, the Nevada County Resource Conservation District, and the Wildfire Safe Coalition of Nevada County. We're not here to replace agency fire management. We're here to extend its reach into the places where community-led action makes the difference.",
    ],
    ctaLabel: "Join the community",
    ctaHref: "/join",
    ctaVariant: "primary",
    mediaPosition: "right",
    backgroundColor: "warm-cream",
    _videoPlaceholder: true,
  },
  {
    _type: "block.principleCards",
    _key: "howWeWork",
    overline: "How We Work",
    heading: "Three principles that guide everything we do.",
    backgroundColor: "sand",
    principles: [
      {
        title: "Community-led",
        body: "Every burn we support is planned and conducted by the landowner. Our role is to show up with trained volunteers, shared equipment, and organizational support. The land is yours. The decision is yours. We back you up.",
      },
      {
        title: "Agency-partnered",
        body: "We work within the regulatory framework, not around it. That means close coordination with CAL FIRE on burn permits, weather windows, and fire behavior. Our members understand the rules because following them is what makes this work sustainable.",
      },
      {
        title: "Ecologically grounded",
        body: "Prescribed fire isn't just a fuel management tool. It's an ecological process that this landscape evolved with. We take that seriously in how we plan burns, choose timing, and think about long-term land health.",
      },
    ],
  },
  {
    _type: "block.teamGrid",
    _key: "teamGrid",
    overline: "Board of Directors",
    heading: "The people behind the organization.",
  },
  {
    _type: "block.advisoryList",
    _key: "advisoryList",
    overline: "Advisory Council",
    intro: "Our Advisory Council brings together expertise in fire ecology, conservation, land management, and local policy to help guide NCPBA's work.",
  },
  {
    _type: "block.fiscalSponsor",
    _key: "fiscalSponsor",
    overline: "Our Fiscal Sponsor",
    body: "NCPBA is a fiscally sponsored project of the Nevada County Resource Conservation District. NCRCD is a trusted local conservation authority with deep roots in Nevada County's land and water stewardship. Their partnership makes our work possible while we build toward full organizational independence.",
  },
];

export default async function AboutPage() {
  const data = await client.fetch(ABOUT_QUERY).catch(() => ({}));

  const boardMembers: BoardMember[] = data?.boardMembers?.length ? data.boardMembers : COPY_BOARD;
  const advisoryMembers: AdvisoryMember[] = data?.advisoryMembers?.length ? data.advisoryMembers : COPY_ADVISORY;

  const blocks = data?.page?.pageBuilder?.length ? data.page.pageBuilder : FALLBACK_BLOCKS;

  return (
    <PageBuilder
      blocks={blocks}
      context={{ boardMembers, advisoryMembers, page: "about" }}
    />
  );
}
