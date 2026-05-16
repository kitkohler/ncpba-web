import Overline from "@/components/Overline";

interface Props {
  overline?: string;
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundColor?: "sand" | "warm-cream";
}

const COPY = {
  overline: "Stay in the Loop",
  heading: "Not ready to jump in yet?",
  body: "Sign up for occasional updates on burns, training opportunities, and NCPBA news.",
  ctaLabel: "Join the mailing list",
  ctaHref: "https://lp.constantcontactpages.com/sl/Uj88TTf",
};

const BG_COLORS: Record<string, string> = {
  sand: "var(--color-sand)",
  "warm-cream": "var(--color-warm-cream)",
};

export default function EmailSignupBlock(props: Props) {
  const bg = BG_COLORS[props.backgroundColor ?? "sand"] ?? "var(--color-sand)";
  const overline = props.overline ?? COPY.overline;
  const heading = props.heading ?? COPY.heading;
  const body = props.body ?? COPY.body;
  const ctaLabel = props.ctaLabel ?? COPY.ctaLabel;
  const ctaHref = props.ctaHref ?? COPY.ctaHref;

  return (
    <section className="py-[72px] px-8 md:px-16" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-[540px] text-center">
        <Overline color="var(--color-sage)" className="justify-center">
          {overline}
        </Overline>
        <h2
          className="text-[28px] md:text-[32px] leading-[1.15] mb-3.5"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
        >
          {heading}
        </h2>
        <p
          className="text-[15px] leading-[1.70] mb-7"
          style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
        >
          {body}
        </p>
        <a
          href={ctaHref}
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
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
