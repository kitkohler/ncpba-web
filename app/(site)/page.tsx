import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import HeroBlock from "@/components/HeroBlock";
import Overline from "@/components/Overline";
import Btn from "@/components/Btn";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

// ─── Static copy (Sanity data overlays these when documents exist) ──────────
const COPY = {
  hero: {
    overline:    "Nevada County · Sierra Nevada Foothills · California",
    headlineFallback: (
      <>
        Good Fire with<br />
        <span style={{ color: "var(--color-ember)" }}>Neighbors.</span>
      </>
    ),
    subhead:     "The Nevada County Prescribed Burn Association is a community of landowners and volunteers who support each other's burns, share equipment, and build the local knowledge that makes prescribed fire safe and achievable in the Sierra Nevada foothills.",
    primaryCta:  { label: "Get Involved",                  href: "/join"         },
    secondaryCta:{ label: "Learn About Prescribed Fire",   href: "/how-it-works" },
  },
  whatWeDo: {
    overline: "What We Do",
    heading:  "Prescribed fire is a tool. Community is what makes it work.",
    body: [
      "A Prescribed Burn Association is a community-led organization that helps landowners use planned, low-intensity fire to manage their land, clearing hazardous fuels, improving habitat, and reducing the risk of catastrophic wildfire.",
      "The model is simple: members support each other's burns. When it's your turn to burn, trained volunteers show up with equipment and know-how. When it's your neighbor's turn, you show up for them. We work alongside CAL FIRE, the Nevada County Resource Conservation District, and other partners. Not around them.",
      "This is neighbor-to-neighbor fire stewardship. The way it used to work, and the way it needs to work again.",
    ],
  },
  whereWeWork: {
    overline: "Where We Work",
    heading:  "The Sierra Nevada foothills are fire country. They always have been.",
    body: [
      "Nevada County sits at the convergence of oak woodland, mixed conifer forest, and working rural land — a landscape shaped by centuries of Indigenous burning and one that has grown increasingly fire-suppressed and fuel-loaded in recent decades.",
      "We're a grassroots response to that reality. Based in Nevada County and focused on the communities, ridgelines, and watersheds that define it.",
    ],
  },
  howItWorks: {
    overline: "How It Works",
    pillars: [
      { n: "01", title: "Landowners lead",             body: "Landowners with burnable land connect with NCPBA to explore whether prescribed fire is right for their property. You plan and conduct your burn. We help you get there." },
      { n: "02", title: "Members show up",              body: "When it's your burn day, NCPBA members show up with the right equipment and experience to make your burn safer and more achievable. And when your neighbor burns, you'll be part of that crew too." },
      { n: "03", title: "The community grows stronger", body: "Every burn builds local knowledge, deepens neighbor trust, and adds one more trained hand to the network. That's how a burn association actually works." },
    ],
  },
  getInvolved: {
    headline: "This only works if you're in it.",
    subhead:  "NCPBA isn't a service you hire. It's a community you join. Bring your land, your labor, or both.",
    cta1: { label: "I Want to Volunteer", href: "/join" },
    cta2: { label: "I Have Land to Burn", href: "/join" },
  },
  partners: {
    overline: "Partners & Affiliations",
    names: [
      "Nevada County Resource Conservation District",
      "Wildfire Safe Coalition of Nevada County",
      "CAL FIRE Nevada-Yuba-Placer Unit",
    ],
    note: "NCPBA is a fiscally sponsored project of the Nevada County Resource Conservation District, a trusted local conservation authority serving Nevada County since 1946.",
  },
};

export default async function HomePage() {
  // Sanity data — falls back to COPY values when document doesn't exist yet
  const page = await client.fetch(HOME_QUERY).catch(() => null);

  const heroImageUrl =
    page?.hero?.backgroundType === "image" && page?.hero?.backgroundImage
      ? urlFor(page.hero.backgroundImage).width(1920).url()
      : undefined;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <HeroBlock
        overline={page?.hero?.overline ?? COPY.hero.overline}
        headline={page?.hero?.headline ?? COPY.hero.headlineFallback}
        subhead={page?.hero?.subhead ?? COPY.hero.subhead}
        primaryCta={{
          label: page?.hero?.ctaLabel     ?? COPY.hero.primaryCta.label,
          href:  page?.hero?.ctaHref      ?? COPY.hero.primaryCta.href,
        }}
        secondaryCta={{
          label: page?.hero?.secondaryCtaLabel ?? COPY.hero.secondaryCta.label,
          href:  page?.hero?.secondaryCtaHref  ?? COPY.hero.secondaryCta.href,
        }}
        backgroundType={page?.hero?.backgroundType ?? "gradient"}
        backgroundImageUrl={heroImageUrl}
        backgroundVideoUrl={page?.hero?.backgroundVideoUrl}
      />

      {/* ── What We Do ───────────────────────────────────────── */}
      <section
        className="py-[96px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-12 md:grid-cols-[5fr_6fr] md:gap-20 items-start">
          <div>
            <Overline color="var(--color-ember)">
              {page?.whatWeDoSection?.overline ?? COPY.whatWeDo.overline}
            </Overline>
            <h2
              className="text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.02em] mb-7"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              {page?.whatWeDoSection?.heading ?? COPY.whatWeDo.heading}
            </h2>
            <div className="flex gap-3 flex-wrap">
              <Btn variant="primary" href="/how-it-works">How It Works</Btn>
              <Btn variant="outline" href="/join">Get Involved</Btn>
            </div>
          </div>
          <div className="flex flex-col gap-[18px]">
            {(page?.whatWeDoSection?.paragraphs ?? COPY.whatWeDo.body).map(
              (para: string, i: number) => (
                <p
                  key={i}
                  className="text-[16px] leading-[1.75]"
                  style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                >
                  {para}
                </p>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Where We Work ────────────────────────────────────── */}
      <section
        className="py-[88px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-sand)" }}
      >
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-[72px] items-center">
          {/* Image placeholder — swap for <Image> when photography is available */}
          <div
            className="rounded-lg overflow-hidden relative"
            style={{
              height: 420,
              background: "linear-gradient(150deg, #3D3220 0%, #6B5B45 55%, #8B7355 100%)",
            }}
          >
            <svg
              className="absolute bottom-0 w-full opacity-45"
              viewBox="0 0 600 220"
              preserveAspectRatio="none"
            >
              <path
                d="M0,220 L0,150 Q60,110 120,140 Q180,170 240,120 Q300,70 360,100 Q420,130 480,80 Q540,30 600,60 L600,220 Z"
                fill="#2C2416"
              />
            </svg>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 35% 50%, rgba(199,91,0,0.12) 0%, transparent 60%)",
              }}
            />
            <div className="absolute bottom-6 left-6">
              <p
                className="text-[13px] italic"
                style={{ color: "rgba(237,229,212,0.45)", fontFamily: "var(--font-display)" }}
              >
                Oak woodland, Sierra Nevada foothills — Nevada County, CA
              </p>
            </div>
          </div>

          <div>
            <Overline color="var(--color-sage)">
              {page?.whereWeWorkSection?.overline ?? COPY.whereWeWork.overline}
            </Overline>
            <h2
              className="text-[30px] md:text-[38px] leading-[1.1] tracking-[-0.02em] mb-[22px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              {page?.whereWeWorkSection?.heading ?? COPY.whereWeWork.heading}
            </h2>
            {(page?.whereWeWorkSection?.paragraphs ?? COPY.whereWeWork.body).map(
              (para: string, i: number) => (
                <p
                  key={i}
                  className="text-[16px] leading-[1.75] mb-4 last:mb-0"
                  style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                >
                  {para}
                </p>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── How It Works — 3 pillars ─────────────────────────── */}
      <section
        className="py-[88px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center max-w-[680px] mx-auto mb-14">
            <Overline color="var(--color-smoke)">
              {page?.howItWorksTeaserSection?.overline ?? COPY.howItWorks.overline}
            </Overline>
            <h2
              className="text-[32px] md:text-[38px] leading-[1.15]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              You&rsquo;re not hiring a service.<br />You&rsquo;re joining a community.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(page?.howItWorksTeaserSteps ?? COPY.howItWorks.pillars).map(
              (p: { n?: string; stepNumber?: number; title?: string; headline?: string; body: string }) => (
                <div
                  key={p.n ?? p.stepNumber}
                  className="rounded-[6px] p-[30px] md:p-7"
                  style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
                >
                  <div
                    className="text-[38px] leading-none mb-[18px]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      color: "rgba(199,91,0,0.18)",
                    }}
                  >
                    {p.n ?? String(p.stepNumber ?? 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="text-[21px] leading-snug mb-3"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
                  >
                    {p.title ?? (p as any).headline}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.72]"
                    style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                  >
                    {p.body}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="text-center mt-11">
            <Btn variant="outline" size="lg" href="/how-it-works">
              See the full model →
            </Btn>
          </div>
        </div>
      </section>

      {/* ── Get Involved strip ───────────────────────────────── */}
      <section
        className="py-[88px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-deep-soil)" }}
      >
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto] md:gap-14 items-center">
          <div>
            <h2
              className="text-[36px] md:text-[46px] leading-[1.08] tracking-[-0.02em] mb-[18px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-warm-cream)" }}
            >
              {page?.ctaStrip?.headline ?? COPY.getInvolved.headline}
            </h2>
            <p
              className="text-[16px] md:text-[17px] leading-[1.70] max-w-[50ch]"
              style={{ color: "rgba(237,229,212,0.68)", fontFamily: "var(--font-body)" }}
            >
              {page?.ctaStrip?.body ?? COPY.getInvolved.subhead}
            </p>
          </div>
          <div className="flex flex-col gap-3 items-start">
            <Btn variant="primary" size="lg" href="/join">
              {COPY.getInvolved.cta1.label}
            </Btn>
            <Btn variant="ghost" size="lg" href="/join">
              {COPY.getInvolved.cta2.label}
            </Btn>
          </div>
        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────────── */}
      <section
        className="py-16 px-8 md:px-16"
        style={{ backgroundColor: "var(--color-sand)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          <Overline color="var(--color-smoke)">{COPY.partners.overline}</Overline>
          <div className="flex flex-wrap gap-2.5 mb-6">
            {COPY.partners.names.map((name) => (
              <div
                key={name}
                className="rounded-[4px] px-[18px] py-2.5 text-[13px] font-medium"
                style={{
                  backgroundColor: "white",
                  color: "var(--color-oak-bark)",
                  boxShadow: "var(--shadow-card)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {name}
              </div>
            ))}
          </div>
          <p
            className="text-[13px] leading-[1.65] max-w-[68ch]"
            style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
          >
            {COPY.partners.note}
          </p>
        </div>
      </section>
    </>
  );
}
