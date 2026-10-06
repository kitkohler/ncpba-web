"use client";

import { useState } from "react";
import { estimatePricePerRoll } from "@/lib/slashPilePaper";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  /** Rolls already ordered across both lists, or null if unknown. */
  totalRolls: number | null;
}

export default function SlashPilePaperOrderForm({ totalRolls }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [rolls, setRolls] = useState(1);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/slash-pile-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          venmo: form.get("venmo"),
          rolls: Number(form.get("rolls")),
          joinNcpba: form.get("joinNcpba") === "on",
          notes: form.get("notes"),
          company: form.get("company"),
        }),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok) throw new Error(result?.error ?? "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-[6px] p-8"
        style={{ backgroundColor: "white", border: "1.5px solid var(--color-sage)" }}
        role="status"
      >
        <h2
          className="text-[28px] leading-snug mb-2"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
        >
          You&rsquo;re on the list
        </h2>
        <p className="text-[15px] leading-[1.7]" style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}>
          Thanks for ordering. We&rsquo;ll email you with the final price per roll, payment, and pickup details
          before the order is placed. Know someone who burns piles? Send them this page — every roll lowers the
          price for everyone.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="order-name">Your name</label>
          <input id="order-name" name="name" type="text" placeholder="Full name" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="order-email">Email address</label>
          <input id="order-email" name="email" type="email" placeholder="your@email.com" autoComplete="email" required />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="order-phone">Phone (optional)</label>
          <input id="order-phone" name="phone" type="tel" placeholder="530-555-0123" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="order-rolls">Number of rolls</label>
          <input
            id="order-rolls"
            name="rolls"
            type="number"
            min={1}
            max={100}
            step={1}
            value={rolls || ""}
            onChange={(e) => setRolls(Math.max(0, Math.floor(Number(e.target.value))) || 0)}
            required
          />
        </div>
      </div>
      {totalRolls !== null && rolls > 0 && (
        <p
          className="text-[14px] rounded-[4px] px-4 py-3 -mt-1"
          style={{ backgroundColor: "rgba(199,91,0,0.08)", color: "var(--color-deep-soil)", fontFamily: "var(--font-body)" }}
          aria-live="polite"
        >
          With your {rolls} {rolls === 1 ? "roll" : "rolls"}, the group order reaches {totalRolls + rolls} rolls — about{" "}
          <strong>${Math.round(estimatePricePerRoll(totalRolls + rolls))} a roll</strong> for everyone
          {" "}(down from ~${Math.round(estimatePricePerRoll(totalRolls))}).
        </p>
      )}
      <div>
        <label htmlFor="order-venmo">Venmo username (optional)</label>
        <input
          id="order-venmo"
          name="venmo"
          type="text"
          placeholder="@your-username"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-describedby="order-venmo-help"
          className="md:max-w-[calc(50%-8px)]"
        />
        <p id="order-venmo-help" className="text-[12px] mt-1.5" style={{ color: "var(--color-smoke-dark)", fontFamily: "var(--font-body)" }}>
          Once the final price is set, we&rsquo;ll send you a Venmo request for your share.
        </p>
      </div>
      <div>
        <label htmlFor="order-notes">Notes (optional)</label>
        <textarea id="order-notes" name="notes" placeholder="Anything we should know?" style={{ minHeight: 90 }} />
      </div>

      <label
        htmlFor="order-join"
        className="flex items-center gap-3 cursor-pointer"
        style={{ fontWeight: 400, marginBottom: 0, fontFamily: "var(--font-body)" }}
      >
        <input
          id="order-join"
          name="joinNcpba"
          type="checkbox"
          className="w-[18px] h-[18px] shrink-0 cursor-pointer"
          style={{ accentColor: "var(--color-ember)" }}
        />
        I&rsquo;d like to join the NCPBA
      </label>

      {/* Honeypot: hidden from people, filled in by spam bots */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="order-company">Company</label>
        <input id="order-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p className="text-[14px]" style={{ color: "var(--color-ember-dark)", fontFamily: "var(--font-body)" }} role="alert">
          {error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center px-7 py-3 text-[15px] font-semibold rounded-[4px] text-white transition-all duration-[180ms] hover:brightness-90 disabled:opacity-60"
          style={{
            backgroundColor: "var(--color-ember)",
            fontFamily: "var(--font-body)",
            border: "none",
            cursor: status === "sending" ? "wait" : "pointer",
          }}
        >
          {status === "sending" ? "Sending…" : "Place my order"}
        </button>
      </div>
    </form>
  );
}
