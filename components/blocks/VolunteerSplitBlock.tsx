import Overline from "@/components/Overline";
import Btn from "@/components/Btn";

interface Props {
  overline?: string;
  heading?: string;
  bodyParagraphs?: string[];
  whatTheyDo?: string[];
  whatTheyGet?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

const COPY = {
  overline: "For Volunteers",
  heading: "No experience required. Commitment is.",
  body: [
    "NCPBA volunteers come from all backgrounds. Some are experienced firefighters. Some have never held a drip torch. What matters is that you show up, follow direction, and take the work seriously.",
    "We offer training pathways to build your skills over time, and we track certifications so you're prepared for increasingly complex roles as you gain experience.",
  ],
  whatTheyDo: [
    "Fuel preparation",
    "Holding lines during burns",
    "Equipment operation",
    "Post-burn monitoring and mop-up",
    "Showing up for neighbors",
  ],
  whatTheyGet: [
    "Training",
    "Experience",
    "Gear access",
    "The satisfaction of doing real ecological work in the place you live",
  ],
};

export default function VolunteerSplitBlock(props: Props) {
  const overline = props.overline ?? COPY.overline;
  const heading = props.heading ?? COPY.heading;
  const body = props.bodyParagraphs?.length ? props.bodyParagraphs : COPY.body;
  const whatTheyDo = props.whatTheyDo?.length ? props.whatTheyDo : COPY.whatTheyDo;
  const whatTheyGet = props.whatTheyGet?.length ? props.whatTheyGet : COPY.whatTheyGet;
  const ctaLabel = props.ctaLabel ?? "Join as a Volunteer";
  const ctaHref = props.ctaHref ?? "/join";

  return (
    <div>
      <Overline color="var(--color-sage)">{overline}</Overline>
      <h2
        className="text-[28px] md:text-[36px] leading-[1.1] mb-[18px]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
      >
        {heading}
      </h2>
      {body.map((para, i) => (
        <p
          key={i}
          className="text-[15px] leading-[1.78] mb-[18px]"
          style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
        >
          {para}
        </p>
      ))}
      <div
        className="rounded-[6px] p-[22px_24px] mb-4"
        style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
      >
        <div
          className="text-[11px] font-bold tracking-[0.07em] uppercase mb-3"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-ember)" }}
        >
          What volunteers do
        </div>
        <ul className="flex flex-col gap-2">
          {whatTheyDo.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 items-start text-[14px]"
              style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
            >
              <span className="font-bold mt-[1px]" style={{ color: "var(--color-sage)" }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="rounded-[6px] p-[22px_24px] mb-7"
        style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
      >
        <div
          className="text-[11px] font-bold tracking-[0.07em] uppercase mb-3"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-sage)" }}
        >
          What volunteers get
        </div>
        <ul className="flex flex-col gap-2">
          {whatTheyGet.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 items-start text-[14px]"
              style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
            >
              <span className="font-bold mt-[1px]" style={{ color: "var(--color-sage)" }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Btn variant="primary" href={ctaHref}>{ctaLabel}</Btn>
    </div>
  );
}
