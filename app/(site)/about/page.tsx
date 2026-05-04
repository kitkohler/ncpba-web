import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import PageHero from "@/components/PageHero";
import Overline from "@/components/Overline";
import Btn from "@/components/Btn";

export const metadata: Metadata = { title: "About" };
export const revalidate = 60;

const COPY = {
  hero: {
    overline: "About NCPBA",
    headline: "We're your neighbors. And we're tired of watching things burn.",
    subhead:  "NCPBA was built by people who live here, work this land, and understand what's at stake if we don't bring good fire back to the Sierra Nevada foothills.",
  },
  whoWeAre: {
    overline: "Who We Are",
    heading:  "Built from the ground up. By the community, for the community.",
    body: [
      "The Nevada County Prescribed Burn Association was founded on a simple conviction: the people who live on this land are the ones best positioned to steward it. Not outside crews. Not distant agencies. Neighbors.",
      "Prescribed fire is one of the most effective tools we have for reducing catastrophic wildfire risk and restoring ecological health to fire-adapted landscapes. But using it safely and legally takes coordination, equipment, trained hands, and trust. That's what NCPBA exists to provide.",
      "We're a community of landowners and volunteers who show up for each other's burns, share knowledge and equipment, and work in close partnership with CAL FIRE, the Nevada County Resource Conservation District, and the Wildfire Safe Coalition of Nevada County. We're not here to replace agency fire management. We're here to extend its reach into the places where community-led action makes the difference.",
    ],
  },
  howWeWork: {
    overline: "How We Work",
    heading:  "Three principles that guide everything we do.",
    principles: [
      {
        title: "Community-led",
        body:  "Every burn we support is planned and conducted by the landowner. Our role is to show up with trained volunteers, shared equipment, and organizational support. The land is yours. The decision is yours. We back you up.",
      },
      {
        title: "Agency-partnered",
        body:  "We work within the regulatory framework, not around it. That means close coordination with CAL FIRE on burn permits, weather windows, and fire behavior. Our members understand the rules because following them is what makes this work sustainable.",
      },
      {
        title: "Ecologically grounded",
        body:  "Prescribed fire isn't just a fuel management tool. It's an ecological process that this landscape evolved with. We take that seriously in how we plan burns, choose timing, and think about long-term land health.",
      },
    ],
  },
  board: {
    overline: "Board of Directors",
    heading:  "The people behind the organization.",
    members: [
      { name: "Kit [Last Name]",       role: "President & Founder", bio: "[Bio — 2–3 sentences, personal and place-based]" },
      { name: "Theo Fitanides",        role: "Vice President",       bio: "[Bio — 2–3 sentences]" },
      { name: "Jennifer Rain Crosby",  role: "Board Member",         bio: "[Bio — 2–3 sentences]" },
    ],
  },
  advisory: {
    overline: "Advisory Council",
    intro:    "Our Advisory Council brings together expertise in fire ecology, conservation, land management, and local policy to help guide NCPBA's work.",
    members: [
      { name: "Alex Geritz",          note: "Nevada County" },
      { name: "Dario Davidson",       note: "" },
      { name: "Jo Ann Fites-Kaufman", note: "Wildfire Safe Coalition of Nevada County" },
      { name: "Haley Coopergard",     note: "Fire Educator, Nevada County Resource Conservation District" },
    ],
  },
  fiscalSponsor: {
    overline: "Our Fiscal Sponsor",
    body:     "NCPBA is a fiscally sponsored project of the Nevada County Resource Conservation District. NCRCD is a trusted local conservation authority with deep roots in Nevada County's land and water stewardship. Their partnership makes our work possible while we build toward full organizational independence.",
  },
};

export default async function AboutPage() {
  const data = await client.fetch(ABOUT_QUERY).catch(() => ({}));
  const page = data?.page;
  const boardMembers: { _id: string; name: string; role: string; bio: string }[] =
    data?.boardMembers ?? [];
  const advisoryMembers: { _id: string; name: string; note?: string }[] =
    data?.advisoryMembers ?? [];

  const displayBoardMembers =
    boardMembers.length > 0 ? boardMembers : COPY.board.members;
  const displayAdvisoryMembers =
    advisoryMembers.length > 0 ? advisoryMembers : COPY.advisory.members;

  return (
    <>
      <PageHero
        overline={page?.hero?.overline ?? COPY.hero.overline}
        headline={page?.hero?.headline ?? COPY.hero.headline}
        subhead={page?.hero?.subhead   ?? COPY.hero.subhead}
      />

      {/* ── Who We Are ───────────────────────────────────────── */}
      <section
        className="py-[96px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20 items-start">
          <div>
            <Overline color="var(--color-sage)">
              {page?.missionVision?.overline ?? COPY.whoWeAre.overline}
            </Overline>
            <h2
              className="text-[30px] md:text-[38px] leading-[1.1] tracking-[-0.02em] mb-[26px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              {page?.missionVision?.heading ?? COPY.whoWeAre.heading}
            </h2>
            {(page?.missionVision?.paragraphs ?? COPY.whoWeAre.body).map(
              (para: string, i: number) => (
                <p
                  key={i}
                  className="text-[15px] leading-[1.78] mb-[18px] last:mb-8"
                  style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                >
                  {para}
                </p>
              )
            )}
            <Btn variant="primary" href="/join">Join the community</Btn>
          </div>

          {/* Video placeholder — replace with <video> embed when available */}
          <div
            className="rounded-[6px] overflow-hidden relative cursor-pointer"
            style={{ aspectRatio: "16/9", backgroundColor: "#1a150e" }}
          >
            <svg
              className="absolute bottom-0 w-full opacity-20"
              viewBox="0 0 800 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0,200 L0,120 Q80,80 160,110 Q240,140 320,90 Q400,40 480,70 Q560,100 640,60 Q720,20 800,50 L800,200 Z"
                fill="#6B5B45"
              />
              <path
                d="M0,200 L0,155 Q100,130 200,150 Q300,170 400,135 Q500,100 600,125 Q700,150 800,130 L800,200 Z"
                fill="#2C2416"
              />
            </svg>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 60%, rgba(199,91,0,0.18) 0%, transparent 65%), radial-gradient(ellipse at 70% 30%, rgba(107,91,69,0.25) 0%, transparent 55%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(199,91,0,0.9)",
                  boxShadow: "0 4px 24px rgba(199,91,0,0.45)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-4 left-5 text-[12px] font-medium"
              style={{ color: "rgba(237,229,212,0.65)", fontFamily: "var(--font-body)" }}
            >
              Community interview: why NCPBA exists
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Work — 3 principles ───────────────────────── */}
      <section
        className="py-[88px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-sand)" }}
      >
        <div className="mx-auto max-w-[940px]">
          <Overline color="var(--color-sage)">
            {page?.howWeWorkSection?.overline ?? COPY.howWeWork.overline}
          </Overline>
          <h2
            className="text-[28px] md:text-[36px] leading-[1.1] mb-12"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
          >
            {page?.howWeWorkSection?.heading ?? COPY.howWeWork.heading}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(page?.howWeWorkPrinciples ?? COPY.howWeWork.principles).map(
              (v: { title: string; body: string }) => (
                <div
                  key={v.title}
                  className="rounded-[6px] p-7"
                  style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
                >
                  <div
                    className="w-1 h-8 rounded-[2px] mb-4"
                    style={{ backgroundColor: "var(--color-ember)" }}
                  />
                  <h3
                    className="text-[20px] leading-snug mb-3"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.72]"
                    style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                  >
                    {v.body}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Board of Directors ───────────────────────────────── */}
      <section
        className="py-[88px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          <Overline color="var(--color-sage)">
            {page?.teamSection?.overline ?? COPY.board.overline}
          </Overline>
          <h2
            className="text-[28px] md:text-[34px] leading-[1.1] mb-11"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
          >
            {page?.teamSection?.heading ?? COPY.board.heading}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
            {displayBoardMembers.map(
              (member: { name: string; role?: string; bio: string }) => (
                <div
                  key={member.name}
                  className="rounded-[6px] p-7"
                  style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-[18px] text-[22px]"
                    style={{
                      backgroundColor: "var(--color-sage)",
                      fontFamily: "var(--font-display)",
                      color: "white",
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div
                    className="text-[15px] font-semibold mb-[3px]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-deep-soil)" }}
                  >
                    {member.name}
                  </div>
                  <div
                    className="text-[12px] font-bold tracking-[0.06em] uppercase mb-3.5"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-ember)" }}
                  >
                    {member.role}
                  </div>
                  <p
                    className="text-[13px] leading-[1.68] italic"
                    style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                  >
                    {member.bio}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Advisory Council */}
          <Overline color="var(--color-sage)">
            {page?.advisorySection?.overline ?? COPY.advisory.overline}
          </Overline>
          <p
            className="text-[15px] leading-[1.70] mb-7 max-w-[62ch]"
            style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
          >
            {page?.advisorySection?.intro ?? COPY.advisory.intro}
          </p>

          <div className="grid grid-cols-1 gap-3.5 max-w-[680px] md:grid-cols-2">
            {displayAdvisoryMembers.map(
              (a: { name: string; note?: string }) => (
                <div
                  key={a.name}
                  className="flex gap-3.5 items-start p-[16px_20px] rounded-[6px]"
                  style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
                >
                  <div
                    className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0 text-[16px]"
                    style={{
                      backgroundColor: "rgba(115,155,91,0.15)",
                      fontFamily: "var(--font-display)",
                      color: "var(--color-sage)",
                    }}
                  >
                    {a.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      className="text-[14px] font-semibold"
                      style={{ fontFamily: "var(--font-body)", color: "var(--color-deep-soil)" }}
                    >
                      {a.name}
                    </div>
                    {a.note && (
                      <div
                        className="text-[12px] mt-0.5"
                        style={{ fontFamily: "var(--font-body)", color: "var(--color-smoke)" }}
                      >
                        {a.note}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Fiscal Sponsor ───────────────────────────────────── */}
      <section
        className="py-16 px-8 md:px-16"
        style={{ backgroundColor: "var(--color-deep-soil)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          <Overline color="rgba(237,229,212,0.38)">
            {COPY.fiscalSponsor.overline}
          </Overline>
          <div className="max-w-[700px]">
            <p
              className="text-[16px] leading-[1.75] mb-7"
              style={{ color: "rgba(237,229,212,0.68)", fontFamily: "var(--font-body)" }}
            >
              {page?.fiscalSponsorBody ?? COPY.fiscalSponsor.body}
            </p>
            <div
              className="w-40 h-16 rounded flex items-center justify-center"
              style={{
                backgroundColor: "rgba(237,229,212,0.07)",
                border: "1px solid rgba(237,229,212,0.12)",
              }}
            >
              <span
                className="text-[12px]"
                style={{ color: "rgba(237,229,212,0.35)", fontFamily: "var(--font-body)" }}
              >
                NCRCD logo
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
