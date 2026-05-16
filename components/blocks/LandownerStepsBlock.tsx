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
  ctaLabel?: string;
  ctaHref?: string;
  steps?: Step[];
}

const COPY = {
  overline: "For Landowners",
  heading: "Your land. Your burn. Our support.",
  steps: [
    {
      n: "1",
      title: "Connect with NCPBA",
      body: "Reach out to start a conversation about your property, your goals, and whether prescribed fire is the right tool for your situation.",
    },
    {
      n: "2",
      title: "Plan your burn",
      body: "Work with NCPBA and, where applicable, with CAL FIRE and other partners to develop a burn plan appropriate for your land and the current conditions. We help you navigate permitting and timing.",
    },
    {
      n: "3",
      title: "Pick your burn day",
      body: "When conditions are right and permits are in order, NCPBA mobilizes volunteers and equipment to support your burn. You're the burn boss. We're your crew.",
    },
    {
      n: "4",
      title: "Pay it forward",
      body: "Landowners who burn with NCPBA support are expected to show up for neighbors when the time comes. That's the agreement that makes all of this possible.",
    },
  ],
  ctaLabel: "Connect with NCPBA",
  ctaHref: "/join",
};

export default function LandownerStepsBlock(props: Props) {
  const overline = props.overline ?? COPY.overline;
  const heading = props.heading ?? COPY.heading;
  const steps = props.steps?.length ? props.steps : COPY.steps;
  const ctaLabel = props.ctaLabel ?? COPY.ctaLabel;
  const ctaHref = props.ctaHref ?? COPY.ctaHref;

  return (
    <div>
      <Overline color="var(--color-sage)">{overline}</Overline>
      <h2
        className="text-[28px] md:text-[36px] leading-[1.1] mb-[26px]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
      >
        {heading}
      </h2>
      <ol className="flex flex-col gap-5">
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
      <div className="mt-8">
        <Btn variant="primary" href={ctaHref}>{ctaLabel}</Btn>
      </div>
    </div>
  );
}
