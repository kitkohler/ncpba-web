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
          <a
            href="https://lp.constantcontactpages.com/sl/qiHM07O/NCPBA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 font-semibold rounded-[4px] border-[1.5px] cursor-pointer select-none whitespace-nowrap transition-all duration-[180ms] ease-out hover:brightness-90 hover:-translate-y-px active:brightness-[0.82] active:scale-[0.98] px-7 py-3 text-[15px]"
            style={{
              backgroundColor: "var(--color-ember)",
              color: "white",
              borderColor: "transparent",
              fontFamily: "var(--font-body)",
              textDecoration: "none",
            }}
          >
            Join the mailing list
          </a>
        </div>
      </section>
    </>
  );
}
