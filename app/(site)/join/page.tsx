import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Overline from "@/components/Overline";
import JoinPathCards from "@/components/JoinPathCards";

export const metadata: Metadata = { title: "Join" };

const COPY = {
  hero: {
    overline: "Join NCPBA",
    headline: "Good fire takes good neighbors.",
    subhead:  "NCPBA is a community you join, not a service you hire. Here's how to become part of it.",
  },
  stayInLoop: {
    overline: "Stay in the Loop",
    heading:  "Not ready to jump in yet?",
    body:     "Sign up for occasional updates on burns, training opportunities, and NCPBA news.",
    note:     "We won't flood your inbox. This is a working organization, not a newsletter factory.",
  },
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        overline={COPY.hero.overline}
        headline={COPY.hero.headline}
        subhead={COPY.hero.subhead}
      />

      {/* ── Two paths + connect form ──────────────────────────── */}
      <section
        className="py-[96px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="mx-auto max-w-[940px]">
          <JoinPathCards />
        </div>
      </section>

      {/* ── Stay in the loop / email sign-up ─────────────────── */}
      <section
        className="py-[72px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-sand)" }}
      >
        <div className="mx-auto max-w-[540px] text-center">
          <Overline color="var(--color-sage)" className="justify-center">
            {COPY.stayInLoop.overline}
          </Overline>
          <h2
            className="text-[28px] md:text-[32px] leading-[1.15] mb-3.5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
          >
            {COPY.stayInLoop.heading}
          </h2>
          <p
            className="text-[15px] leading-[1.70] mb-7"
            style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
          >
            {COPY.stayInLoop.body}
          </p>
          <div className="flex max-w-[420px] mx-auto mb-3.5">
            <input
              type="email"
              placeholder="your@email.com"
              style={{ borderRadius: "4px 0 0 4px", borderRight: "none" }}
            />
            <button
              className="text-[14px] font-semibold px-4 whitespace-nowrap"
              style={{
                backgroundColor: "var(--color-ember)",
                color: "white",
                border: "none",
                borderRadius: "0 4px 4px 0",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>
          <p
            className="text-[12px] leading-[1.5]"
            style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
          >
            {COPY.stayInLoop.note}
          </p>
        </div>
      </section>
    </>
  );
}
