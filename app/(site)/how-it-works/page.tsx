import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { HOW_IT_WORKS_QUERY } from "@/sanity/lib/queries";
import PageHero from "@/components/PageHero";
import Overline from "@/components/Overline";
import Btn from "@/components/Btn";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = { title: "How It Works" };
export const revalidate = 0;

const COPY = {
  hero: {
    overline: "The Model",
    headline: "This is the barn-raising model. Applied to fire.",
    subhead:  "When it's your burn day, the community shows up for you. When it's your neighbor's burn day, you show up for them. That's how a burn association works.",
  },
  model: {
    overline: "The Model",
    heading:  "You're not hiring a service. You're joining a community.",
    body: [
      "A lot of people hear \"burn association\" and imagine a crew you call when you want your land burned. That's not what this is.",
      "NCPBA is a mutual aid network. Landowners plan and conduct their own burns. Volunteers support those burns with trained hands and shared equipment. And everyone who benefits from the network is expected to contribute to it — showing up for neighbors, building skills, and helping the community grow.",
      "The more members participate, the stronger the network gets. More trained volunteers means more burns supported. More burns means more local knowledge. More local knowledge means safer, more effective fire on the landscape.",
    ],
  },
  landowners: {
    overline: "For Landowners",
    heading:  "Your land. Your burn. Our support.",
    steps: [
      { n: "1", title: "Connect with NCPBA",  body: "Reach out to start a conversation about your property, your goals, and whether prescribed fire is the right tool for your situation." },
      { n: "2", title: "Plan your burn",       body: "Work with NCPBA and, where applicable, with CAL FIRE and other partners to develop a burn plan appropriate for your land and the current conditions. We help you navigate permitting and timing." },
      { n: "3", title: "Pick your burn day",   body: "When conditions are right and permits are in order, NCPBA mobilizes volunteers and equipment to support your burn. You're the burn boss. We're your crew." },
      { n: "4", title: "Pay it forward",       body: "Landowners who burn with NCPBA support are expected to show up for neighbors when the time comes. That's the agreement that makes all of this possible." },
    ],
  },
  volunteers: {
    overline: "For Volunteers",
    heading:  "No experience required. Commitment is.",
    body: [
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
  },
  faq: {
    overline: "Common Questions",
    heading:  "Frequently asked.",
    items: [
      {
        question: "Do I need to own land to get involved?",
        answer:   "No. Volunteers don't need to be landowners. If you want to help support burns and build fire skills in Nevada County, there's a place for you.",
      },
      {
        question: "What permits do I need to burn?",
        answer:   "It depends on the time of year, your location, and the size of your burn. CAL FIRE issues burn permits for most open burning in Nevada County. NCPBA can help you understand what's required for your specific situation.",
      },
      {
        question: "Is prescribed burning legal in California?",
        answer:   "Yes. Prescribed burning with proper permits is legal in California and actively encouraged by CAL FIRE and state agencies as a fire risk reduction strategy.",
      },
      {
        question: "When is burn season in Nevada County?",
        answer:   "Prescribed burning in Nevada County happens year-round with the right permits. CAL FIRE requires burn permits for open burning, and permit conditions vary by season. The primary window when conditions are most favorable tends to be fall through early spring. Around May 1 CAL FIRE typically shifts to more restrictive permit conditions as fire danger increases heading into summer. Fall reopening is variable, usually somewhere between mid-October and late November depending on conditions that year.",
      },
      {
        question: "What does it cost to work with NCPBA?",
        answer:   "There is no fee for landowner participation. NCPBA operates on a mutual aid model. Your contribution is showing up for neighbors when they burn.",
      },
    ],
  },
};

export default async function HowItWorksPage() {
  const page = await client.fetch(HOW_IT_WORKS_QUERY).catch(() => null);
  const faqItems = page?.faqItems ?? COPY.faq.items;

  return (
    <>
      <PageHero
        overline={page?.hero?.overline ?? COPY.hero.overline}
        headline={page?.hero?.headline ?? COPY.hero.headline}
        subhead={page?.hero?.subhead   ?? COPY.hero.subhead}
      />

      {/* ── The Model ────────────────────────────────────────── */}
      <section
        className="py-[96px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-12 md:grid-cols-[5fr_6fr] md:gap-20 items-start">
          <div>
            <Overline color="var(--color-sage)">
              {page?.introSection?.overline ?? COPY.model.overline}
            </Overline>
            <h2
              className="text-[30px] md:text-[38px] leading-[1.1] tracking-[-0.02em] mb-7"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              {page?.introSection?.heading ?? COPY.model.heading}
            </h2>
            <Btn variant="primary" size="lg" href="/join">Join NCPBA</Btn>
          </div>
          <div className="flex flex-col gap-[18px]">
            {COPY.model.body.map((para, i) => (
              <p
                key={i}
                className="text-[16px] leading-[1.78]"
                style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Landowner + Volunteer paths ──────────────────────── */}
      <section
        className="py-[88px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-sand)" }}
      >
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 items-start">
          {/* Landowner path */}
          <div>
            <Overline color="var(--color-sage)">
              {page?.landOwnerSection?.overline ?? COPY.landowners.overline}
            </Overline>
            <h2
              className="text-[28px] md:text-[36px] leading-[1.1] mb-[26px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              {page?.landOwnerSection?.heading ?? COPY.landowners.heading}
            </h2>

            <ol className="flex flex-col gap-5">
              {COPY.landowners.steps.map((step) => (
                <li key={step.n} className="flex gap-[18px] items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-[2px]"
                    style={{ backgroundColor: "var(--color-ember)" }}
                  >
                    <span
                      className="text-[12px] font-bold text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {step.n}
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-[15px] font-semibold mb-[5px]"
                      style={{ fontFamily: "var(--font-body)", color: "var(--color-deep-soil)" }}
                    >
                      {step.title}
                    </div>
                    <p
                      className="text-[14px] leading-[1.70]"
                      style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                    >
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <Btn variant="primary" href="/join">Connect with NCPBA</Btn>
            </div>
          </div>

          {/* Volunteer path */}
          <div>
            <Overline color="var(--color-sage)">
              {page?.volunteerSection?.overline ?? COPY.volunteers.overline}
            </Overline>
            <h2
              className="text-[28px] md:text-[36px] leading-[1.1] mb-[18px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              {page?.volunteerSection?.heading ?? COPY.volunteers.heading}
            </h2>

            {COPY.volunteers.body.map((para, i) => (
              <p
                key={i}
                className="text-[15px] leading-[1.78] mb-[18px]"
                style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
              >
                {para}
              </p>
            ))}

            <div
              className="rounded-[6px] p-[22px_24px] mb-4"
              style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="text-[11px] font-bold tracking-[0.07em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-ember)" }}
              >
                What volunteers do
              </div>
              <ul className="flex flex-col gap-2">
                {COPY.volunteers.whatTheyDo.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 items-start text-[14px]"
                    style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
                  >
                    <span className="font-bold mt-[1px]" style={{ color: "var(--color-sage)" }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-[6px] p-[22px_24px] mb-7"
              style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="text-[11px] font-bold tracking-[0.07em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-sage)" }}
              >
                What volunteers get
              </div>
              <ul className="flex flex-col gap-2">
                {COPY.volunteers.whatTheyGet.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 items-start text-[14px]"
                    style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
                  >
                    <span className="font-bold mt-[1px]" style={{ color: "var(--color-sage)" }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Btn variant="primary" href="/join">Join as a Volunteer</Btn>
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ────────────────────────────────────── */}
      <section
        className="py-[88px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="mx-auto max-w-[780px]">
          <Overline color="var(--color-sage)">
            {page?.faqSection?.overline ?? COPY.faq.overline}
          </Overline>
          <h2
            className="text-[26px] md:text-[34px] leading-[1.1] mb-10"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
          >
            {page?.faqSection?.heading ?? COPY.faq.heading}
          </h2>
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
