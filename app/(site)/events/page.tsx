import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Btn from "@/components/Btn";

export const metadata: Metadata = { title: "Events" };
export const revalidate = 300;

interface UnderBurnEvent {
  id: string;
  title: string;
  event_type?: string;
  starts_at?: string;
  ends_at?: string;
  location_public?: string | null;
  description?: string;
  complexity?: string;
  acreage?: string | number;
  has_fire?: boolean;
  rsvp_url?: string;
}

async function fetchEvents(): Promise<UnderBurnEvent[]> {
  try {
    const res = await fetch(
      "https://app.underburn.org/api/orgs/ncpba/events/public",
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.events)) return data.events;
    return [];
  } catch {
    return [];
  }
}

const TYPE_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  training:   { label: "Training",   bg: "rgba(115,155,91,0.14)",  text: "var(--color-sage)" },
  burn:       { label: "Burn Day",   bg: "rgba(199,91,0,0.12)",    text: "var(--color-ember)" },
  "burn-day": { label: "Burn Day",   bg: "rgba(199,91,0,0.12)",    text: "var(--color-ember)" },
  burn_day:   { label: "Burn Day",   bg: "rgba(199,91,0,0.12)",    text: "var(--color-ember)" },
  meetup:     { label: "Meetup",     bg: "rgba(115,155,91,0.14)",  text: "var(--color-sage)" },
  meeting:    { label: "Meeting",    bg: "rgba(115,155,91,0.14)",  text: "var(--color-sage)" },
  community:  { label: "Community",  bg: "rgba(115,155,91,0.14)",  text: "var(--color-sage)" },
  workshop:   { label: "Workshop",   bg: "rgba(107,91,69,0.10)",   text: "var(--color-oak-bark)" },
};

const COMPLEXITY_CONFIG: Record<string, { label: string; color: string }> = {
  low:    { label: "Beginner-friendly", color: "var(--color-sage)" },
  medium: { label: "Intermediate",      color: "var(--color-oak-bark)" },
  high:   { label: "Advanced",          color: "var(--color-ember)" },
};

function formatDateRange(startsAt?: string, endsAt?: string): { date: string; time: string } | null {
  if (!startsAt) return null;
  try {
    const start = new Date(startsAt);
    if (isNaN(start.getTime())) return null;

    const dateFmt = (d: Date) =>
      d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
    const timeFmt = (d: Date) =>
      d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

    if (!endsAt) {
      return { date: dateFmt(start), time: timeFmt(start) };
    }

    const end = new Date(endsAt);
    if (isNaN(end.getTime())) return { date: dateFmt(start), time: timeFmt(start) };

    const sameDay =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();

    if (sameDay) {
      return { date: dateFmt(start), time: `${timeFmt(start)} – ${timeFmt(end)}` };
    }

    return {
      date: `${dateFmt(start)} – ${dateFmt(end)}`,
      time: `${timeFmt(start)} each day`,
    };
  } catch {
    return null;
  }
}

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <>
      <PageHero
        overline="Upcoming Events"
        headline="Burns, trainings, and community meetups."
        subhead="Stay current with what NCPBA has in the field — prescribed burns, volunteer training sessions, and community gatherings across Nevada County."
      />

      <section
        className="py-16 md:py-20 px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="mx-auto max-w-[900px]">
          {events.length === 0 ? (
            <div className="py-24 text-center">
              <p
                className="text-[15px] mb-6"
                style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
              >
                No upcoming events scheduled right now — check back soon.
              </p>
              <Btn variant="ghost-light" size="md" href="https://lp.constantcontactpages.com/sl/Uj88TTf">
                Get notified when events are posted
              </Btn>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {events.map((evt) => {
                const typeKey = evt.event_type?.toLowerCase().replace(/\s+/g, "-") ?? "";
                const typeConfig = TYPE_CONFIG[typeKey];
                const complexityConfig = evt.complexity ? COMPLEXITY_CONFIG[evt.complexity.toLowerCase()] : null;
                const dateRange = formatDateRange(evt.starts_at, evt.ends_at);
                const acreage = evt.acreage ? String(evt.acreage) : null;

                return (
                  <article
                    key={evt.id}
                    className="rounded-[6px] p-7 md:p-8 flex flex-col gap-[18px]"
                    style={{ backgroundColor: "white", boxShadow: "var(--shadow-card)" }}
                  >
                    {/* Chips row */}
                    <div className="flex flex-wrap items-center gap-2">
                      {typeConfig && (
                        <span
                          className="inline-block text-[11px] font-bold tracking-[0.07em] uppercase rounded-[3px] px-2.5 py-1"
                          style={{ backgroundColor: typeConfig.bg, color: typeConfig.text, fontFamily: "var(--font-body)" }}
                        >
                          {typeConfig.label}
                        </span>
                      )}
                      {complexityConfig && (
                        <span
                          className="inline-block text-[11px] font-semibold tracking-[0.05em] rounded-[3px] px-2.5 py-1"
                          style={{ backgroundColor: "rgba(107,91,69,0.07)", color: complexityConfig.color, fontFamily: "var(--font-body)" }}
                        >
                          {complexityConfig.label}
                        </span>
                      )}
                      {acreage && (
                        <span
                          className="inline-block text-[11px] font-semibold tracking-[0.05em] rounded-[3px] px-2.5 py-1"
                          style={{ backgroundColor: "rgba(107,91,69,0.07)", color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
                        >
                          {acreage} ac
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2
                      className="text-[22px] md:text-[26px] leading-snug"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
                    >
                      {evt.title}
                    </h2>

                    {/* Date / time / location meta */}
                    <div className="flex flex-col gap-1.5">
                      {dateRange && (
                        <div
                          className="flex items-start gap-2 text-[13px]"
                          style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-[1px] shrink-0" aria-hidden="true">
                            <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                            <path d="M5 1.5v3M11 1.5v3M2 6.5h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          </svg>
                          <span>
                            {dateRange.date}
                            {" · "}
                            {dateRange.time}
                          </span>
                        </div>
                      )}
                      {evt.location_public && (
                        <div
                          className="flex items-start gap-2 text-[13px]"
                          style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-[1px] shrink-0" aria-hidden="true">
                            <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.485-2.015-4.5-4.5-4.5Zm0 6.25A1.75 1.75 0 1 1 8 4.25a1.75 1.75 0 0 1 0 3.5Z" fill="currentColor"/>
                          </svg>
                          {evt.location_public}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {evt.description && (
                      <p
                        className="text-[14px] leading-[1.75]"
                        style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                      >
                        {evt.description}
                      </p>
                    )}

                    {/* RSVP */}
                    {evt.rsvp_url && (
                      <div>
                        <Btn variant="primary" size="md" href={evt.rsvp_url}>
                          RSVP
                        </Btn>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Mailing list nudge ───────────────────────────────── */}
      <section
        className="py-14 px-8 md:px-16 text-center"
        style={{ backgroundColor: "var(--color-sand)" }}
      >
        <p
          className="text-[15px] mb-4"
          style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
        >
          Want a heads-up when new events are posted?
        </p>
        <Btn variant="primary" size="md" href="https://lp.constantcontactpages.com/sl/Uj88TTf">
          Join the Nevada County Prescribed Fire mailing list
        </Btn>
      </section>
    </>
  );
}
