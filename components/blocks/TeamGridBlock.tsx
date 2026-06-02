import { PortableText } from "@portabletext/react";
import Overline from "@/components/Overline";
import Btn from "@/components/Btn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function textBlock(text: string): any[] {
  return [{ _type: "block", _key: "b", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s", text, marks: [] }] }];
}

interface BoardMember {
  _id?: string;
  name: string;
  role?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio: any[];
}

interface Props {
  overline?: string;
  heading?: string;
  boardMembers?: BoardMember[];
}

const COPY_BOARD: BoardMember[] = [
  { name: "Kit [Last Name]", role: "President & Founder", bio: textBlock("[Bio — 2–3 sentences, personal and place-based]") },
  { name: "Theo Fitanides", role: "Vice President", bio: textBlock("[Bio — 2–3 sentences]") },
  { name: "Jennifer Rain Crosby", role: "Board Member", bio: textBlock("[Bio — 2–3 sentences]") },
];

export default function TeamGridBlock(props: Props) {
  const members = props.boardMembers?.length ? props.boardMembers : COPY_BOARD;
  const overline = props.overline ?? "Board of Directors";
  const heading = props.heading ?? "The people behind the organization.";

  return (
    <section
      className="pt-[88px] pb-16 px-8 md:px-16"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <Overline color="var(--color-sage)">{overline}</Overline>
        <h2
          className="text-[28px] md:text-[34px] leading-[1.1] mb-11"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
        >
          {heading}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
          {members.map((member) => (
            <div
              key={member._id ?? member.name}
              className="rounded-[6px] p-7"
              style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-[18px] text-[22px]"
                style={{
                  backgroundColor: "var(--color-sage)",
                  fontFamily: "var(--font-display)",
                  color: "white",
                }}
              >
                {member.name.charAt(0)}
              </div>
              <div
                className="text-[15px] font-semibold mb-[3px]"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-deep-soil)" }}
              >
                {member.name}
              </div>
              <div
                className="text-[12px] font-bold tracking-[0.06em] uppercase mb-3.5"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-ember)" }}
              >
                {member.role}
              </div>
              <div
                className="text-[13px] leading-[1.68] italic [&_p]:mb-2 [&_p:last-child]:mb-0"
                style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
              >
                <PortableText value={member.bio} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
