import Link from "next/link";

interface CTAStripProps {
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CTAStrip({ headline, body, ctaLabel, ctaHref }: CTAStripProps) {
  return (
    <section
      className="w-full py-20"
      style={{ backgroundColor: "var(--color-ember)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-xl">
          {headline && (
            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-warm-cream)" }}
            >
              {headline}
            </h2>
          )}
          {body && (
            <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--color-warm-cream)", opacity: 0.9 }}>
              {body}
            </p>
          )}
        </div>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="shrink-0 rounded border-2 px-8 py-4 text-base font-semibold transition-colors hover:bg-white/10"
            style={{
              borderColor: "var(--color-warm-cream)",
              color: "var(--color-warm-cream)",
            }}
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
