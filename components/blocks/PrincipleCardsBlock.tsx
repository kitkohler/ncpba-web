import Overline from "@/components/Overline";

interface Principle {
  title: string;
  body: string;
}

interface Props {
  overline?: string;
  heading?: string;
  backgroundColor?: "warm-cream" | "sand";
  principles?: Principle[];
  _fallbackPrinciples?: Principle[];
}

const BG_COLORS: Record<string, string> = {
  "warm-cream": "var(--color-warm-cream)",
  sand: "var(--color-sand)",
};

const COPY_PRINCIPLES: Principle[] = [
  {
    title: "Community-led",
    body: "Every burn we support is planned and conducted by the landowner. Our role is to show up with trained volunteers, shared equipment, and organizational support. The land is yours. The decision is yours. We back you up.",
  },
  {
    title: "Agency-partnered",
    body: "We work within the regulatory framework, not around it. That means close coordination with CAL FIRE on burn permits, weather windows, and fire behavior. Our members understand the rules because following them is what makes this work sustainable.",
  },
  {
    title: "Ecologically grounded",
    body: "Prescribed fire isn't just a fuel management tool. It's an ecological process that this landscape evolved with. We take that seriously in how we plan burns, choose timing, and think about long-term land health.",
  },
];

export default function PrincipleCardsBlock(props: Props) {
  const bg = BG_COLORS[props.backgroundColor ?? "sand"] ?? "var(--color-sand)";
  const principles = props.principles?.length
    ? props.principles
    : (props._fallbackPrinciples ?? COPY_PRINCIPLES);

  return (
    <section className="py-[88px] px-8 md:px-16" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-[940px]">
        {props.overline && (
          <Overline color="var(--color-sage)">{props.overline}</Overline>
        )}
        {props.heading && (
          <h2
            className="text-[28px] md:text-[36px] leading-[1.1] mb-12"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
          >
            {props.heading}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {principles.map((v) => (
            <div
              key={v.title}
              className="rounded-[6px] p-7"
              style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="w-1 h-8 rounded-[2px] mb-4"
                style={{ backgroundColor: "var(--color-ember)" }}
              />
              <h3
                className="text-[20px] leading-snug mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
              >
                {v.title}
              </h3>
              <p
                className="text-[14px] leading-[1.72]"
                style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
