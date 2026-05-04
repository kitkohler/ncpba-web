import type { Metadata } from "next";
import Overline from "@/components/Overline";
import Btn from "@/components/Btn";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <section
      className="flex min-h-[70vh] flex-col items-center justify-center px-8 py-24 text-center"
      style={{ backgroundColor: "var(--color-deep-soil)" }}
    >
      <Overline color="var(--color-sage)" className="justify-center">
        Coming soon
      </Overline>
      <h1
        className="max-w-xl text-[34px] md:text-[42px] leading-[1.12] tracking-[-0.02em] mb-5"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-warm-cream)" }}
      >
        Events calendar launching soon
      </h1>
      <p
        className="text-[15px] leading-[1.70] max-w-lg mb-10"
        style={{ color: "rgba(237,229,212,0.58)", fontFamily: "var(--font-body)" }}
      >
        Burn days, training sessions, and community meetups — we're building this out now.
        Sign up to get notified when it launches.
      </p>
      <Btn variant="ghost" size="lg" href="/join">
        Get notified
      </Btn>
    </section>
  );
}
