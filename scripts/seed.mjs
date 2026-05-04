/**
 * Seed script — creates initial Sanity content documents.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<token> node scripts/seed.mjs
 *
 * Get a write token from:
 *   sanity.io/manage → project 2r7xt8dx → API → Tokens → Add API Token (Editor)
 *
 * Safe to re-run: uses createOrReplace, so existing documents are overwritten.
 */

import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("SANITY_API_WRITE_TOKEN environment variable is required.");
  process.exit(1);
}

const client = createClient({
  projectId: "2r7xt8dx",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ─── Helper ───────────────────────────────────────────────────────────────────

function block(text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text }],
    markDefs: [],
  };
}

function ref(id) {
  return { _type: "reference", _ref: id, _key: Math.random().toString(36).slice(2) };
}

// ─── Documents ────────────────────────────────────────────────────────────────

const homePage = {
  _id: "homePage",
  _type: "homePage",
  hero: {
    overline: "Nevada County · Sierra Nevada Foothills · California",
    headline: "Good Fire with Neighbors.",
    subhead:
      "The Nevada County Prescribed Burn Association is a community of landowners and volunteers who support each other's burns, share equipment, and build the local knowledge that makes prescribed fire safe and achievable in the Sierra Nevada foothills.",
    ctaLabel: "Get Involved",
    ctaHref: "/join",
    secondaryCtaLabel: "Learn About Prescribed Fire",
    secondaryCtaHref: "/how-it-works",
    backgroundType: "gradient",
  },
  whatWeDoSection: {
    overline: "What We Do",
    heading: "Prescribed fire is a tool. Community is what makes it work.",
    paragraphs: [
      "A Prescribed Burn Association is a community-led organization that helps landowners use planned, low-intensity fire to manage their land, clearing hazardous fuels, improving habitat, and reducing the risk of catastrophic wildfire.",
      "The model is simple: members support each other's burns. When it's your turn to burn, trained volunteers show up with equipment and know-how. When it's your neighbor's turn, you show up for them. We work alongside CAL FIRE, the Nevada County Resource Conservation District, and other partners. Not around them.",
      "This is neighbor-to-neighbor fire stewardship. The way it used to work, and the way it needs to work again.",
    ],
  },
  whereWeWorkSection: {
    overline: "Where We Work",
    heading: "The Sierra Nevada foothills are fire country. They always have been.",
    paragraphs: [
      "Nevada County sits at the convergence of oak woodland, mixed conifer forest, and working rural land — a landscape shaped by centuries of Indigenous burning and one that has grown increasingly fire-suppressed and fuel-loaded in recent decades.",
      "We're a grassroots response to that reality. Based in Nevada County and focused on the communities, ridgelines, and watersheds that define it.",
    ],
  },
  howItWorksTeaserSection: {
    overline: "How It Works",
  },
  howItWorksTeaserSteps: [
    { _key: "step1", n: "01", title: "Landowners lead", body: "Landowners with burnable land connect with NCPBA to explore whether prescribed fire is right for their property. You plan and conduct your burn. We help you get there." },
    { _key: "step2", n: "02", title: "Members show up", body: "When it's your burn day, NCPBA members show up with the right equipment and experience to make your burn safer and more achievable. And when your neighbor burns, you'll be part of that crew too." },
    { _key: "step3", n: "03", title: "The community grows stronger", body: "Every burn builds local knowledge, deepens neighbor trust, and adds one more trained hand to the network. That's how a burn association actually works." },
  ],
  ctaStrip: {
    headline: "This only works if you're in it.",
    body: "NCPBA isn't a service you hire. It's a community you join. Bring your land, your labor, or both.",
  },
};

const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  hero: {
    overline: "About NCPBA",
    headline: "We're your neighbors. And we're tired of watching things burn.",
    subhead:
      "NCPBA was built by people who live here, work this land, and understand what's at stake if we don't bring good fire back to the Sierra Nevada foothills.",
  },
  missionVision: {
    overline: "Who We Are",
    heading: "Built from the ground up. By the community, for the community.",
    paragraphs: [
      "The Nevada County Prescribed Burn Association was founded on a simple conviction: the people who live on this land are the ones best positioned to steward it. Not outside crews. Not distant agencies. Neighbors.",
      "Prescribed fire is one of the most effective tools we have for reducing catastrophic wildfire risk and restoring ecological health to fire-adapted landscapes. But using it safely and legally takes coordination, equipment, trained hands, and trust. That's what NCPBA exists to provide.",
      "We're a community of landowners and volunteers who show up for each other's burns, share knowledge and equipment, and work in close partnership with CAL FIRE, the Nevada County Resource Conservation District, and the Wildfire Safe Coalition of Nevada County. We're not here to replace agency fire management. We're here to extend its reach into the places where community-led action makes the difference.",
    ],
  },
  howWeWorkSection: {
    overline: "How We Work",
    heading: "Three principles that guide everything we do.",
  },
  howWeWorkPrinciples: [
    {
      _key: "p1",
      title: "Community-led",
      body: "Every burn we support is planned and conducted by the landowner. Our role is to show up with trained volunteers, shared equipment, and organizational support. The land is yours. The decision is yours. We back you up.",
    },
    {
      _key: "p2",
      title: "Agency-partnered",
      body: "We work within the regulatory framework, not around it. That means close coordination with CAL FIRE on burn permits, weather windows, and fire behavior. Our members understand the rules because following them is what makes this work sustainable.",
    },
    {
      _key: "p3",
      title: "Ecologically grounded",
      body: "Prescribed fire isn't just a fuel management tool. It's an ecological process that this landscape evolved with. We take that seriously in how we plan burns, choose timing, and think about long-term land health.",
    },
  ],
  teamSection: {
    overline: "Board of Directors",
    heading: "The people behind the organization.",
  },
  advisorySection: {
    overline: "Advisory Council",
    intro:
      "Our Advisory Council brings together expertise in fire ecology, conservation, land management, and local policy to help guide NCPBA's work.",
  },
  fiscalSponsorBody:
    "NCPBA is a fiscally sponsored project of the Nevada County Resource Conservation District. NCRCD is a trusted local conservation authority with deep roots in Nevada County's land and water stewardship. Their partnership makes our work possible while we build toward full organizational independence.",
};

const howItWorksPage = {
  _id: "howItWorksPage",
  _type: "howItWorksPage",
  hero: {
    overline: "The Model",
    headline: "This is the barn-raising model. Applied to fire.",
    subhead:
      "When it's your burn day, the community shows up for you. When it's your neighbor's burn day, you show up for them. That's how a burn association works.",
  },
  introSection: {
    overline: "The Model",
    heading: "You're not hiring a service. You're joining a community.",
  },
  landOwnerSection: {
    overline: "For Landowners",
    heading: "Your land. Your burn. Our support.",
  },
  volunteerSection: {
    overline: "For Volunteers",
    heading: "No experience required. Commitment is.",
  },
  faqSection: {
    overline: "Common Questions",
    heading: "Frequently asked.",
  },
  // faqs array populated after faqItem documents are created
};

const joinPage = {
  _id: "joinPage",
  _type: "joinPage",
  hero: {
    overline: "Join NCPBA",
    headline: "Good fire takes good neighbors.",
    subhead: "NCPBA is a community you join, not a service you hire. Here's how to become part of it.",
  },
  emailSignupHeading: "Not ready to jump in yet?",
  emailSignupBody:
    "Sign up for occasional updates on burns, training opportunities, and NCPBA news.",
};

const contactPage = {
  _id: "contactPage",
  _type: "contactPage",
  hero: {
    overline: "Contact",
    headline: "Get in touch.",
    subhead:
      "Questions about burns, volunteering, landowner participation, or partnership. We're a small organization and we read everything.",
  },
  email: "info@nevadacountypba.org",
  location: "Nevada County, California",
};

const boardMembers = [
  {
    _id: "boardMember-1",
    _type: "boardMember",
    name: "Kit [Last Name]",
    role: "President & Founder",
    bio: "[Bio — 2–3 sentences, personal and place-based]",
    order: 1,
  },
  {
    _id: "boardMember-2",
    _type: "boardMember",
    name: "Theo Fitanides",
    role: "Vice President",
    bio: "[Bio — 2–3 sentences]",
    order: 2,
  },
  {
    _id: "boardMember-3",
    _type: "boardMember",
    name: "Jennifer Rain Crosby",
    role: "Board Member",
    bio: "[Bio — 2–3 sentences]",
    order: 3,
  },
];

const advisoryMembers = [
  {
    _id: "advisoryMember-1",
    _type: "advisoryCouncilMember",
    name: "Alex Geritz",
    affiliation: "Nevada County",
    order: 1,
  },
  {
    _id: "advisoryMember-2",
    _type: "advisoryCouncilMember",
    name: "Dario Davidson",
    affiliation: "",
    order: 2,
  },
  {
    _id: "advisoryMember-3",
    _type: "advisoryCouncilMember",
    name: "Jo Ann Fites-Kaufman",
    affiliation: "Wildfire Safe Coalition of Nevada County",
    order: 3,
  },
  {
    _id: "advisoryMember-4",
    _type: "advisoryCouncilMember",
    name: "Haley Coopergard",
    affiliation: "Fire Educator, Nevada County Resource Conservation District",
    order: 4,
  },
];

const partners = [
  {
    _id: "partner-1",
    _type: "partner",
    name: "Nevada County Resource Conservation District",
    order: 1,
  },
  {
    _id: "partner-2",
    _type: "partner",
    name: "Wildfire Safe Coalition of Nevada County",
    order: 2,
  },
  {
    _id: "partner-3",
    _type: "partner",
    name: "CAL FIRE Nevada-Yuba-Placer Unit",
    order: 3,
  },
];

const faqItems = [
  {
    _id: "faqItem-1",
    _type: "faqItem",
    question: "Do I need to own land to get involved?",
    answer: [
      block(
        "No. Volunteers don't need to be landowners. If you want to help support burns and build fire skills in Nevada County, there's a place for you."
      ),
    ],
    order: 1,
  },
  {
    _id: "faqItem-2",
    _type: "faqItem",
    question: "What permits do I need to burn?",
    answer: [
      block(
        "It depends on the time of year, your location, and the size of your burn. CAL FIRE issues burn permits for most open burning in Nevada County. NCPBA can help you understand what's required for your specific situation."
      ),
    ],
    order: 2,
  },
  {
    _id: "faqItem-3",
    _type: "faqItem",
    question: "Is prescribed burning legal in California?",
    answer: [
      block(
        "Yes. Prescribed burning with proper permits is legal in California and actively encouraged by CAL FIRE and state agencies as a fire risk reduction strategy."
      ),
    ],
    order: 3,
  },
  {
    _id: "faqItem-4",
    _type: "faqItem",
    question: "When is burn season in Nevada County?",
    answer: [
      block(
        "Prescribed burning in Nevada County happens year-round with the right permits. CAL FIRE requires burn permits for open burning, and permit conditions vary by season. The primary window when conditions are most favorable tends to be fall through early spring. Around May 1 CAL FIRE typically shifts to more restrictive permit conditions as fire danger increases heading into summer. Fall reopening is variable, usually somewhere between mid-October and late November depending on conditions that year."
      ),
    ],
    order: 4,
  },
  {
    _id: "faqItem-5",
    _type: "faqItem",
    question: "What does it cost to work with NCPBA?",
    answer: [
      block(
        "There is no fee for landowner participation. NCPBA operates on a mutual aid model. Your contribution is showing up for neighbors when they burn."
      ),
    ],
    order: 5,
  },
];

// ─── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  const all = [
    homePage,
    aboutPage,
    joinPage,
    contactPage,
    ...boardMembers,
    ...advisoryMembers,
    ...partners,
    ...faqItems,
  ];

  console.log(`Seeding ${all.length} documents...`);

  for (const doc of all) {
    await client.createOrReplace(doc);
    console.log(`  ✓ ${doc._type} ${doc._id}`);
  }

  // Wire FAQ items into howItWorksPage after they exist
  const faqRefs = faqItems.map((f) => ref(f._id));
  await client.createOrReplace({ ...howItWorksPage, faqs: faqRefs });
  console.log(`  ✓ howItWorksPage (with ${faqRefs.length} FAQ refs)`);

  console.log("\nDone. Open /studio to review and publish each document.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
