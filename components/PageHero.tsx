import Overline from "./Overline";

interface PageHeroProps {
  overline?: string;
  headline: string;
  subhead?: string;
}

/** Dark-soil hero used on interior pages (About, How It Works, Join, Contact). */
export default function PageHero({ overline, headline, subhead }: PageHeroProps) {
  return (
    <section
      className="px-8 md:px-16 py-[88px] md:py-[88px]"
      style={{ backgroundColor: "var(--color-deep-soil)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[800px]">
          {overline && <Overline color="var(--color-sage)" className="mb-5">{overline}</Overline>}
          <h1
            className="text-[42px] md:text-[54px] leading-[1.07] tracking-[-0.025em] mb-[22px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-warm-cream)" }}
          >
            {headline}
          </h1>
          {subhead && (
            <p
              className="text-[17px] md:text-[18px] leading-[1.70] max-w-[54ch]"
              style={{ color: "rgba(237,229,212,0.68)", fontFamily: "var(--font-body)" }}
            >
              {subhead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
