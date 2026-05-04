import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Overline from "@/components/Overline";

export const metadata: Metadata = { title: "Contact" };

const SUBJECT_OPTIONS = [
  "Landowner Inquiry",
  "Volunteer Interest",
  "Partnership",
  "Press",
  "Other",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        overline="Contact"
        headline="Get in touch."
        subhead="Questions about burns, volunteering, landowner participation, or partnership. We're a small organization and we read everything."
      />

      <section
        className="py-[88px] px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div
          className="mx-auto max-w-[1000px] grid grid-cols-1 gap-16 md:grid-cols-[2fr_1.2fr] items-start"
        >
          {/* ── Form ────────────────────────────────────────────── */}
          <div>
            <h2
              className="text-[28px] leading-snug mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              Send a message
            </h2>
            <p
              className="text-[14px] mb-8"
              style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
            >
              For media inquiries, partnership opportunities, or general questions.
            </p>

            <form className="flex flex-col gap-[18px]">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-name">Your name</label>
                  <input id="contact-name" type="text" placeholder="Full name" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="contact-email">Email address</label>
                  <input id="contact-email" type="email" placeholder="your@email.com" autoComplete="email" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject">Subject</label>
                <select id="contact-subject">
                  <option value="">Select a subject…</option>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt.toLowerCase().replace(/\s+/g, "-")}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Your message here…"
                  style={{ minHeight: 140 }}
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-7 py-3 text-[15px] font-semibold rounded-[4px] text-white transition-all duration-[180ms] hover:brightness-90"
                  style={{ backgroundColor: "var(--color-ember)", fontFamily: "var(--font-body)", border: "none", cursor: "pointer" }}
                >
                  Send message
                </button>
                <span
                  className="text-[12px]"
                  style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
                >
                  Typically replied to within 2–3 business days.
                </span>
              </div>
            </form>
          </div>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-7">
            {/* Direct contact */}
            <div>
              <Overline color="var(--color-smoke)" className="mb-4">
                Direct contact
              </Overline>

              {/* Email */}
              <div className="flex gap-3.5 items-start mb-[18px]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(199,91,0,0.10)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ember)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <div
                    className="text-[12px] mb-0.5"
                    style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
                  >
                    Email
                  </div>
                  <a
                    href="mailto:info@nevadacountypba.org"
                    className="text-[14px] font-medium no-underline hover:underline"
                    style={{ color: "var(--color-deep-soil)", fontFamily: "var(--font-body)" }}
                  >
                    info@nevadacountypba.org
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-3.5 items-start">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(199,91,0,0.10)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ember)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div
                    className="text-[12px] mb-0.5"
                    style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
                  >
                    Location
                  </div>
                  <div
                    className="text-[14px] font-medium"
                    style={{ color: "var(--color-deep-soil)", fontFamily: "var(--font-body)" }}
                  >
                    Nevada County, California
                  </div>
                  <div
                    className="text-[12px]"
                    style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
                  >
                    Sierra Nevada foothills
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid rgba(107,91,69,0.18)" }} />

            {/* Newsletter */}
            <div
              className="rounded-[6px] p-[22px]"
              style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="text-[13px] font-semibold mb-1.5"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-deep-soil)" }}
              >
                Stay in the loop
              </div>
              <p
                className="text-[12px] leading-[1.55] mb-3.5"
                style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
              >
                Get burn notifications and news from NCPBA.
              </p>
              <input type="email" placeholder="your@email.com" className="mb-2.5" />
              <button
                className="w-full text-[14px] font-semibold py-[10px] rounded-[4px] text-white"
                style={{
                  backgroundColor: "var(--color-ember)",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
