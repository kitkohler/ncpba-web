import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { HOW_IT_WORKS_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";

export const metadata: Metadata = { title: "How It Works" };
export const revalidate = 60;

const FALLBACK_BLOCKS = [
  {
    _type: "block.pageHero",
    _key: "hero",
    overline: "The Model",
    headline: "This is the barn-raising model. Applied to fire.",
    subhead: "When it's your burn day, the community shows up for you. When it's your neighbor's burn day, you show up for them. That's how a burn association works.",
  },
  {
    _type: "block.textMedia",
    _key: "theModel",
    overline: "The Model",
    overlineColor: "sage",
    heading: "You're not hiring a service. You're joining a community.",
    paragraphs: [
      "A lot of people hear \"burn association\" and imagine a crew you call when you want your land burned. That's not what this is.",
      "NCPBA is a mutual aid network. Landowners plan and conduct their own burns. Volunteers support those burns with trained hands and shared equipment. And everyone who benefits from the network is expected to contribute to it — showing up for neighbors, building skills, and helping the community grow.",
      "The more members participate, the stronger the network gets. More trained volunteers means more burns supported. More burns means more local knowledge. More local knowledge means safer, more effective fire on the landscape.",
    ],
    ctaLabel: "Join NCPBA",
    ctaHref: "/join",
    ctaVariant: "primary",
    mediaPosition: "right",
    backgroundColor: "warm-cream",
  },
  {
    _type: "block.stepCards",
    _key: "landownerSteps",
    overline: "For Landowners",
    heading: "Your land. Your burn. Our support.",
    layout: "list",
    ctaLabel: "Connect with NCPBA",
    ctaHref: "/join",
    steps: [
      { n: "1", title: "Connect with NCPBA", body: "Reach out to start a conversation about your property, your goals, and whether prescribed fire is the right tool for your situation." },
      { n: "2", title: "Plan your burn", body: "Work with NCPBA and, where applicable, with CAL FIRE and other partners to develop a burn plan appropriate for your land and the current conditions. We help you navigate permitting and timing." },
      { n: "3", title: "Pick your burn day", body: "When conditions are right and permits are in order, NCPBA mobilizes volunteers and equipment to support your burn. You're the burn boss. We're your crew." },
      { n: "4", title: "Pay it forward", body: "Landowners who burn with NCPBA support are expected to show up for neighbors when the time comes. That's the agreement that makes all of this possible." },
    ],
  },
  {
    _type: "block.volunteerSplit",
    _key: "volunteerSplit",
    overline: "For Volunteers",
    heading: "No experience required. Commitment is.",
    bodyParagraphs: [
      "NCPBA volunteers come from all backgrounds. Some are experienced firefighters. Some have never held a drip torch. What matters is that you show up, follow direction, and take the work seriously.",
      "We offer training pathways to build your skills over time, and we track certifications so you're prepared for increasingly complex roles as you gain experience.",
    ],
    whatTheyDo: [
      "Fuel preparation",
      "Holding lines during burns",
      "Equipment operation",
      "Post-burn monitoring and mop-up",
      "Showing up for neighbors",
    ],
    whatTheyGet: [
      "Training",
      "Experience",
      "Gear access",
      "The satisfaction of doing real ecological work in the place you live",
    ],
    ctaLabel: "Join as a Volunteer",
    ctaHref: "/join",
  },
  {
    _type: "block.faqSection",
    _key: "faqSection",
    overline: "Common Questions",
    heading: "Frequently asked.",
    faqItems: [
      { _id: "faq-1", question: "Do I need to own land to get involved?", answer: "No. Volunteers don't need to be landowners. If you want to help support burns and build fire skills in Nevada County, there's a place for you." },
      { _id: "faq-2", question: "What permits do I need to burn?", answer: "It depends on the time of year, your location, and the size of your burn. CAL FIRE issues burn permits for most open burning in Nevada County. NCPBA can help you understand what's required for your specific situation." },
      { _id: "faq-3", question: "Is prescribed burning legal in California?", answer: "Yes. Prescribed burning with proper permits is legal in California and actively encouraged by CAL FIRE and state agencies as a fire risk reduction strategy." },
      { _id: "faq-4", question: "When is burn season in Nevada County?", answer: "Prescribed burning in Nevada County happens year-round with the right permits. CAL FIRE requires burn permits for open burning, and permit conditions vary by season. The primary window when conditions are most favorable tends to be fall through early spring. Around May 1 CAL FIRE typically shifts to more restrictive permit conditions as fire danger increases heading into summer. Fall reopening is variable, usually somewhere between mid-October and late November depending on conditions that year." },
      { _id: "faq-5", question: "What does it cost to work with NCPBA?", answer: "There is no fee for landowner participation. NCPBA operates on a mutual aid model. Your contribution is showing up for neighbors when they burn." },
    ],
  },
];

export default async function HowItWorksPage() {
  const page = await client.fetch(HOW_IT_WORKS_QUERY).catch(() => null);
  const blocks = page?.pageBuilder?.length ? page.pageBuilder : FALLBACK_BLOCKS;

  return <PageBuilder blocks={blocks} context={{ page: "how-it-works" }} />;
}
