import Overline from "@/components/Overline";

interface AdvisoryMember {
  _id?: string;
  name: string;
  note?: string;
}

interface Props {
  overline?: string;
  intro?: string;
  advisoryMembers?: AdvisoryMember[];
}

const COPY_ADVISORY: AdvisoryMember[] = [
  { name: "Alex Geritz", note: "Nevada County" },
  { name: "Dario Davidson", note: "" },
  { name: "Jo Ann Fites-Kaufman", note: "Wildfire Safe Coalition of Nevada County" },
  { name: "Haley Coopergard", note: "Fire Educator, Nevada County Resource Conservation District" },
];

export default function AdvisoryListBlock(props: Props) {
  const members = props.advisoryMembers?.length ? props.advisoryMembers : COPY_ADVISORY;
  const overline = props.overline ?? "Advisory Council";
  const intro =
    props.intro ??
    "Our Advisory Council brings together expertise in fire ecology, conservation, land management, and local policy to help guide NCPBA's work.";

  return (
    <section
      className="pb-[88px] px-8 md:px-16"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <Overline color="var(--color-sage)">{overline}</Overline>
        <p
          className="text-[15px] leading-[1.70] mb-7 max-w-[62ch]"
          style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
        >
          {intro}
        </p>
        <div className="grid grid-cols-1 gap-3.5 max-w-[680px] md:grid-cols-2">
          {members.map((a) => (
            <div
              key={a._id ?? a.name}
              className="flex gap-3.5 items-start p-[16px_20px] rounded-[6px]"
              style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0 text-[16px]"
                style={{
                  backgroundColor: "rgba(115,155,91,0.15)",
                  fontFamily: "var(--font-display)",
                  color: "var(--color-sage)",
                }}
              >
                {a.name.charAt(0)}
              </div>
              <div>
                <div
                  className="text-[14px] font-semibold"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-deep-soil)" }}
                >
                  {a.name}
                </div>
                {a.note && (
                  <div
                    className="text-[12px] mt-0.5"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-smoke)" }}
                  >
                    {a.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
