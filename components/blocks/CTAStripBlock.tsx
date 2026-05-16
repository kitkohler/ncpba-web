import CTAStripBase from "@/components/CTAStrip";
import Btn from "@/components/Btn";

interface Props {
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "ember" | "deep-soil";
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  // Fallback copy
  _fallbackHeadline?: string;
  _fallbackBody?: string;
  _fallbackCta1Label?: string;
  _fallbackCta1Href?: string;
  _fallbackCta2Label?: string;
  _fallbackCta2Href?: string;
  _mailingListHref?: string;
}

const COPY = {
  headline: "This only works if you're in it.",
  body: "NCPBA isn't a service you hire. It's a community you join. Bring your land, your labor, or both.",
  cta1Label: "I Want to Volunteer",
  cta1Href: "/join",
  cta2Label: "I Have Land to Burn",
  cta2Href: "/join",
  mailingListHref: "https://lp.constantcontactpages.com/sl/Uj88TTf",
};

export default function CTAStripBlock(props: Props) {
  const variant = props.variant ?? "deep-soil";
  const headline = props.headline ?? props._fallbackHeadline ?? COPY.headline;
  const body = props.body ?? props._fallbackBody ?? COPY.body;

  if (variant === "ember") {
    return (
      <CTAStripBase
        headline={headline}
        body={body}
        ctaLabel={props.ctaLabel ?? props._fallbackCta1Label}
        ctaHref={props.ctaHref ?? props._fallbackCta1Href}
      />
    );
  }

  // deep-soil variant — the home page get-involved strip
  return (
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
            {headline}
          </h2>
          <p
            className="text-[16px] md:text-[17px] leading-[1.70] max-w-[50ch]"
            style={{ color: "rgba(237,229,212,0.68)", fontFamily: "var(--font-body)" }}
          >
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-3 items-start">
          <Btn variant="primary" size="lg" href={props.ctaHref ?? props._fallbackCta1Href ?? COPY.cta1Href}>
            {props.ctaLabel ?? props._fallbackCta1Label ?? COPY.cta1Label}
          </Btn>
          <Btn
            variant="ghost"
            size="lg"
            href={props.secondaryCtaHref ?? props._fallbackCta2Href ?? COPY.cta2Href}
          >
            {props.secondaryCtaLabel ?? props._fallbackCta2Label ?? COPY.cta2Label}
          </Btn>
          <a
            href={props._mailingListHref ?? COPY.mailingListHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-semibold opacity-[0.52] hover:opacity-100 transition-opacity duration-200"
            style={{
              color: "rgba(237,229,212,0.82)",
              fontFamily: "var(--font-body)",
              textDecoration: "none",
            }}
          >
            Join the mailing list →
          </a>
        </div>
      </div>
    </section>
  );
}
