// Path cards (landowner / volunteer) hidden for now — may restore later.
// Copy and card logic preserved in git history (components/JoinPathCards.tsx).

interface Props {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const COPY = {
  heading: "Ready to get involved?",
  body: "Join our community and we’ll be in touch within a few days.",
  ctaLabel: "Join the NCPBA Community",
  ctaHref: "https://groups.io/g/ncpba/join",
};

export default function JoinSignupBlock(props: Props) {
  const heading = props.heading ?? COPY.heading;
  const body = props.body ?? COPY.body;
  const ctaLabel = props.ctaLabel ?? COPY.ctaLabel;
  const ctaHref = props.ctaHref ?? COPY.ctaHref;

  return (
    <section
      className="py-[96px] px-8 md:px-16"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      <div className="mx-auto max-w-[940px]">
        <div
          className="rounded-[6px] p-11 text-center"
          style={{ backgroundColor: "white", boxShadow: "0 1px 3px rgba(44,36,22,0.08)" }}
        >
          <h2
            className="text-[26px] leading-snug mb-2"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
          >
            {heading}
          </h2>
          <p
            className="text-[14px] mb-7"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-smoke)" }}
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
      </div>
    </section>
  );
}
