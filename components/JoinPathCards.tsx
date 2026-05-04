"use client";

import { useState } from "react";
import Btn from "./Btn";

const LANDOWNER = {
  heading: "I have land to burn",
  body:    "You're a Nevada County landowner interested in using prescribed fire to manage your property. You want support, equipment, and trained neighbors behind you when burn day comes.",
  note:    "What we ask in return: show up for neighbors when they burn. That's the agreement.",
};

const VOLUNTEER = {
  heading: "I want to volunteer",
  body:    "You want to build fire skills, do meaningful ecological work, and be part of a community that takes land stewardship seriously. No experience required. Genuine commitment required.",
  note:    "What you'll get: training, gear access, field experience, and a crew.",
};

export default function JoinPathCards() {
  const [path, setPath] = useState<"landowner" | "volunteer" | null>(null);

  const cardStyle = (active: boolean) => ({
    backgroundColor: active ? "var(--color-deep-soil)" : "white",
    border: `2px solid ${active ? "var(--color-ember)" : "transparent"}`,
    boxShadow: "0 1px 3px rgba(44,36,22,0.08), 0 6px 20px rgba(44,36,22,0.06)",
  });

  const textColor = (active: boolean) => (active ? "var(--color-warm-cream)" : "var(--color-deep-soil)");
  const bodyColor = (active: boolean) => (active ? "rgba(237,229,212,0.65)" : "var(--color-oak-bark)");
  const noteColor = (active: boolean) => (active ? "rgba(237,229,212,0.50)" : "var(--color-smoke)");

  return (
    <div>
      {/* Path cards */}
      <div className="grid grid-cols-1 gap-6 mb-14 md:grid-cols-2">
        {/* Landowner */}
        <button
          className="rounded-[8px] p-[36px_32px] text-left cursor-pointer transition-all duration-200 w-full"
          style={cardStyle(path === "landowner")}
          onClick={() => setPath(path === "landowner" ? null : "landowner")}
          onMouseEnter={(e) => {
            if (path !== "landowner")
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(44,36,22,0.14)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 1px 3px rgba(44,36,22,0.08), 0 6px 20px rgba(44,36,22,0.06)";
          }}
        >
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-[22px]"
            style={{ backgroundColor: "rgba(199,91,0,0.12)" }}
          >
            🌲
          </div>
          <h3
            className="text-[24px] leading-snug mb-3.5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: textColor(path === "landowner") }}
          >
            {LANDOWNER.heading}
          </h3>
          <p
            className="text-[15px] leading-[1.72] mb-[22px]"
            style={{ fontFamily: "var(--font-body)", color: bodyColor(path === "landowner"), maxWidth: "none" }}
          >
            {LANDOWNER.body}
          </p>
          <p
            className="text-[13px] italic"
            style={{ fontFamily: "var(--font-body)", color: noteColor(path === "landowner") }}
          >
            {LANDOWNER.note}
          </p>
        </button>

        {/* Volunteer */}
        <button
          className="rounded-[8px] p-[36px_32px] text-left cursor-pointer transition-all duration-200 w-full"
          style={cardStyle(path === "volunteer")}
          onClick={() => setPath(path === "volunteer" ? null : "volunteer")}
          onMouseEnter={(e) => {
            if (path !== "volunteer")
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(44,36,22,0.14)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 1px 3px rgba(44,36,22,0.08), 0 6px 20px rgba(44,36,22,0.06)";
          }}
        >
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-[22px]"
            style={{ backgroundColor: "rgba(115,155,91,0.15)" }}
          >
            🤝
          </div>
          <h3
            className="text-[24px] leading-snug mb-3.5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: textColor(path === "volunteer") }}
          >
            {VOLUNTEER.heading}
          </h3>
          <p
            className="text-[15px] leading-[1.72] mb-[22px]"
            style={{ fontFamily: "var(--font-body)", color: bodyColor(path === "volunteer"), maxWidth: "none" }}
          >
            {VOLUNTEER.body}
          </p>
          <p
            className="text-[13px] italic"
            style={{ fontFamily: "var(--font-body)", color: noteColor(path === "volunteer") }}
          >
            {VOLUNTEER.note}
          </p>
        </button>
      </div>

      {/* Connect form card */}
      <div
        className="rounded-[6px] p-11"
        style={{ backgroundColor: "white", boxShadow: "0 1px 3px rgba(44,36,22,0.08)" }}
      >
        <h2
          className="text-[26px] leading-snug mb-2"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
        >
          Connect with NCPBA
        </h2>
        <p
          className="text-[14px] mb-7"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-smoke)" }}
        >
          {path ? `Reaching out as: ${path === "landowner" ? "Landowner" : "Volunteer"}. ` : ""}
          We'll be in touch within a few days.
        </p>
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="join-name">Your name</label>
              <input id="join-name" type="text" placeholder="Full name" />
            </div>
            <div>
              <label htmlFor="join-email">Email address</label>
              <input id="join-email" type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label htmlFor="join-zip">ZIP code</label>
            <input id="join-zip" type="text" placeholder="95959" style={{ maxWidth: 200 }} />
          </div>
          <div>
            <label htmlFor="join-msg">Anything you&rsquo;d like us to know?</label>
            <textarea
              id="join-msg"
              placeholder="Tell us about your land, your background, or your interest in prescribed fire…"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Btn variant="primary" size="lg" type="submit">
              Send message
            </Btn>
            <span
              className="text-[12px]"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-smoke)" }}
            >
              We respect your privacy.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
