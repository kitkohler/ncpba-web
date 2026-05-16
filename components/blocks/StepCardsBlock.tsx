import Overline from "@/components/Overline";
import Btn from "@/components/Btn";

interface Step {
  n?: string;
  title?: string;
  body?: string;
}

interface Props {
  overline?: string;
  heading?: string;
  layout?: "grid" | "list";
  ctaLabel?: string;
  ctaHref?: string;
  steps?: Step[];
  // Fallback copy injected by page FALLBACK_BLOCKS
  _fallbackSteps?: Step[];
  _fallbackHeading?: string;
  _fallbackOverline?: string;
  _backgroundColor?: string;
}

export default function StepCardsBlock(props: Props) {
  const steps = props.steps?.length ? props.steps : (props._fallbackSteps ?? []);
  const heading = props.heading ?? props._fallbackHeading;
  const overline = props.overline ?? props._fallbackOverline;
  const layout = props.layout ?? "grid";
  const bg = props._backgroundColor ?? "var(--color-warm-cream)";

  if (layout === "list") {
    // Vertical numbered list (landowner steps style)
    return (
      <section className="py-[88px] px-8 md:px-16" style={{ backgroundColor: "var(--color-sand)" }}>
        <div className="mx-auto max-w-[1200px]">
          {overline && (
            <Overline color="var(--color-sage)">{overline}</Overline>
          )}
          {heading && (
            <h2
              className="text-[28px] md:text-[36px] leading-[1.1] mb-[26px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              {heading}
            </h2>
          )}
          <ol className="flex flex-col gap-5 max-w-[560px]">
            {steps.map((step, i) => (
              <li key={step.n ?? i} className="flex gap-[18px] items-start">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-[2px]"
                  style={{ backgroundColor: "var(--color-ember)" }}
                >
                  <span
                    className="text-[12px] font-bold text-white"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {step.n ?? String(i + 1)}
                  </span>
                </div>
                <div>
                  <div
                    className="text-[15px] font-semibold mb-[5px]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-deep-soil)" }}
                  >
                    {step.title}
                  </div>
                  <p
                    className="text-[14px] leading-[1.70]"
                    style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {props.ctaLabel && props.ctaHref && (
            <div className="mt-8">
              <Btn variant="primary" href={props.ctaHref}>{props.ctaLabel}</Btn>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Grid layout (number cards style — home page)
  return (
    <section className="py-[88px] px-8 md:px-16" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-[1200px]">
        {(overline || heading) && (
          <div className="text-center max-w-[680px] mx-auto mb-14">
            {overline && (
              <Overline color="var(--color-smoke)">{overline}</Overline>
            )}
            {heading && (
              <h2
                className="text-[32px] md:text-[38px] leading-[1.15]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
              >
                {heading}
              </h2>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.n ?? i}
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
                {step.n ?? String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className="text-[21px] leading-snug mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-[14px] leading-[1.72]"
                style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
        {props.ctaLabel && props.ctaHref && (
          <div className="text-center mt-11">
            <Btn variant="outline" size="lg" href={props.ctaHref}>
              {props.ctaLabel}
            </Btn>
          </div>
        )}
      </div>
    </section>
  );
}
