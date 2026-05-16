import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY, PARTNERS_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";
import Overline from "@/components/Overline";

export const revalidate = 60;

export const metadata: Metadata = { title: "NCPBA — Nevada County Prescribed Burn Association" };

// ─── Partners section (not part of pageBuilder, always shown below) ──────────

const COPY_PARTNERS = {
  overline: "Partners & Affiliations",
  names: [
    "Nevada County Resource Conservation District",
    "Wildfire Safe Coalition of Nevada County",
    "CAL FIRE Nevada-Yuba-Placer Unit",
  ],
  note: "NCPBA is a fiscally sponsored project of the Nevada County Resource Conservation District, a trusted local conservation authority serving Nevada County since 1946.",
};

// ─── Fallback blocks (reproduce current visual output when Sanity doc is empty) ─

const FALLBACK_BLOCKS = [
  {
    _type: "block.hero",
    _key: "hero",
    backgroundVideoUrl: "https://res.cloudinary.com/drpr93xmp/video/upload/NCPBA_Header_rrgxgn.mp4",
    overlayOpacity: 66,
    // overline/headline/subhead/cta use HeroBlock's own COPY defaults
  },
  {
    _type: "block.textMedia",
    _key: "whatWeDo",
    overline: "What We Do",
    overlineColor: "ember",
    heading: "Prescribed fire is a tool. Community is what makes it work.",
    paragraphs: [
      "A Prescribed Burn Association is a community-led organization that helps landowners use planned, low-intensity fire to manage their land, clearing hazardous fuels, improving habitat, and reducing the risk of catastrophic wildfire.",
      "The model is simple: members support each other's burns. When it's your turn to burn, trained volunteers show up with equipment and know-how. When it's your neighbor's turn, you show up for them. We work alongside CAL FIRE, the Nevada County Resource Conservation District, and other partners. Not around them.",
      "This is neighbor-to-neighbor fire stewardship. The way it used to work, and the way it needs to work again.",
    ],
    ctaLabel: "How It Works",
    ctaHref: "/how-it-works",
    ctaVariant: "primary",
    _fallbackSecondaryCtaLabel: "Get Involved",
    _fallbackSecondaryCtaHref: "/join",
    _fallbackSecondaryCtaVariant: "outline",
    mediaPosition: "right",
    backgroundColor: "warm-cream",
    _videoPlaceholder: true,
  },
  {
    _type: "block.textMedia",
    _key: "whereWeWork",
    overline: "Where We Work",
    overlineColor: "sage",
    heading: "The Sierra Nevada foothills are fire country. They always have been.",
    paragraphs: [
      "Nevada County sits at the convergence of oak woodland, mixed conifer forest, and working rural land — a landscape shaped by centuries of Indigenous burning and one that has grown increasingly fire-suppressed and fuel-loaded in recent decades.",
      "We're a grassroots response to that reality. Based in Nevada County and focused on the communities, ridgelines, and watersheds that define it.",
    ],
    mediaPosition: "left",
    backgroundColor: "sand",
  },
  {
    _type: "block.stepCards",
    _key: "howItWorks",
    overline: "How It Works",
    heading: "You're not hiring a service.\nYou're joining a community.",
    layout: "grid",
    ctaLabel: "See the full model →",
    ctaHref: "/how-it-works",
    steps: [
      { n: "01", title: "Landowners lead", body: "Landowners with burnable land connect with NCPBA to explore whether prescribed fire is right for their property. You plan and conduct your burn. We help you get there." },
      { n: "02", title: "Members show up", body: "When it's your burn day, NCPBA members show up with the right equipment and experience to make your burn safer and more achievable. And when your neighbor burns, you'll be part of that crew too." },
      { n: "03", title: "The community grows stronger", body: "Every burn builds local knowledge, deepens neighbor trust, and adds one more trained hand to the network. That's how a burn association actually works." },
    ],
    _backgroundColor: "var(--color-warm-cream)",
  },
  {
    _type: "block.ctaStrip",
    _key: "getInvolved",
    headline: "This only works if you're in it.",
    body: "NCPBA isn't a service you hire. It's a community you join. Bring your land, your labor, or both.",
    variant: "deep-soil",
    _fallbackCta1Label: "I Want to Volunteer",
    _fallbackCta1Href: "/join",
    _fallbackCta2Label: "I Have Land to Burn",
    _fallbackCta2Href: "/join",
    _mailingListHref: "https://lp.constantcontactpages.com/sl/Uj88TTf",
  },
];

export default async function HomePage() {
  const [page, partners] = await Promise.all([
    client.fetch(HOME_QUERY).catch(() => null),
    client.fetch(PARTNERS_QUERY).catch(() => []),
  ]);

  const blocks = page?.pageBuilder?.length ? page.pageBuilder : FALLBACK_BLOCKS;
  const displayPartners = partners?.length
    ? partners
    : COPY_PARTNERS.names.map((name: string) => ({ _id: name, name }));

  return (
    <>
      <PageBuilder blocks={blocks} />

      {/* Partners section — always shown, not part of pageBuilder */}
      <section
        className="py-16 px-8 md:px-16"
        style={{ backgroundColor: "var(--color-sand)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          <Overline color="var(--color-smoke)">{COPY_PARTNERS.overline}</Overline>
          <div className="flex flex-wrap gap-2.5 mb-6">
            {displayPartners.map((p: { _id: string; name: string; href?: string }) => (
              <div
                key={p._id}
                className="rounded-[4px] px-[18px] py-2.5 text-[13px] font-medium"
                style={{
                  backgroundColor: "white",
                  color: "var(--color-oak-bark)",
                  boxShadow: "var(--shadow-card)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {p.name}
              </div>
            ))}
          </div>
          <p
            className="text-[13px] leading-[1.65] max-w-[68ch]"
            style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
          >
            {COPY_PARTNERS.note}
          </p>
        </div>
      </section>
    </>
  );
}
