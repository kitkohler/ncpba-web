import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Overline from "@/components/Overline";
import Btn from "@/components/Btn";
import { UNDERBURN_JOIN_URL } from "@/lib/underburn";

export const metadata: Metadata = {
  title: "Join the PBA",
  description:
    "NCPBA membership runs through Underburn. Create a free account to join, RSVP to burns and trainings, and get on our discussion list.",
};

const STEPS = [
  {
    title: "Create your free account",
    body: "Sign up on Underburn and request to join NCPBA. Tell us a little about yourself if you like.",
  },
  {
    title: "We review your request",
    body: "An NCPBA organizer looks over new requests. You’ll get an email once you’re in.",
  },
  {
    title: "You’re on the list",
    body: "New members are added to our Groups.io discussion list automatically. You can leave it anytime.",
  },
];

export default function JoinThePbaPage() {
  return (
    <>
      <PageHero
        overline="Join NCPBA"
        headline="Membership now runs through Underburn."
        subhead="Create a free Underburn account to join NCPBA, RSVP to burns and trainings, and stay in the loop with the crew."
      >
        <div className="mt-8">
          <Btn variant="primary" size="lg" href={UNDERBURN_JOIN_URL}>
            Join NCPBA on Underburn
          </Btn>
        </div>
      </PageHero>

      <section className="py-[88px] px-8 md:px-16" style={{ backgroundColor: "var(--color-warm-cream)" }}>
        <div className="mx-auto max-w-[1000px]">
          <Overline className="mb-4">What is Underburn?</Overline>
          <h2
            className="text-[32px] md:text-[38px] leading-[1.15] tracking-[-0.015em] mb-5 max-w-[22ch]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
          >
            One place to coordinate good fire.
          </h2>
          <p
            className="text-[17px] leading-[1.7] max-w-[62ch] mb-12"
            style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
          >
            Underburn is a coordination platform built for prescribed burn associations like ours. Members use it to
            RSVP to burns and training events, track their certifications, and keep up with what NCPBA is doing.
          </p>

          <Overline color="var(--color-smoke-dark)" className="mb-5">
            How joining works
          </Overline>
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-3 mb-12">
            {STEPS.map(({ title, body }, i) => (
              <li key={title} className="rounded-[6px] p-6" style={{ backgroundColor: "white" }}>
                <div
                  className="text-[13px] font-semibold mb-2"
                  style={{ color: "var(--color-ember)", fontFamily: "var(--font-body)" }}
                >
                  Step {i + 1}
                </div>
                <h3
                  className="text-[20px] leading-snug mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[14px] leading-[1.7]"
                  style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
                >
                  {body}
                </p>
              </li>
            ))}
          </ol>

          <p
            className="text-[15px] leading-[1.7] max-w-[62ch] mb-8"
            style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
          >
            <strong style={{ color: "var(--color-deep-soil)" }}>Already on our Groups.io list?</strong> Sign up on
            Underburn with the same email address you use there.
          </p>

          <Btn variant="primary" size="lg" href={UNDERBURN_JOIN_URL}>
            Join NCPBA on Underburn
          </Btn>
        </div>
      </section>
    </>
  );
}
