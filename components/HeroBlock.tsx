import Overline from "./Overline";
import Btn from "./Btn";

interface HeroBlockProps {
  overline?: string;
  headline: React.ReactNode;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /**
   * "gradient" — decorative CSS gradient (default / placeholder)
   * "image"    — full-bleed photo via backgroundImageUrl
   * "video"    — full-bleed video via backgroundVideoUrl
   */
  backgroundType?: "gradient" | "image" | "video";
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
}

/**
 * Full-viewport home page hero.
 * Background slot is designed for easy swap between gradient / image / video
 * without touching the content or overlay layers.
 */
export default function HeroBlock({
  overline,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  backgroundType = "gradient",
  backgroundImageUrl,
  backgroundVideoUrl,
}: HeroBlockProps) {
  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--color-deep-soil)" }}
    >
      {/* ── Background slot ─────────────────────────────────── */}

      {backgroundType === "gradient" && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #1a120a 0%, #3a2710 30%, #2C2416 60%, #1a150e 100%)",
          }}
        >
          {/* Terrain SVG silhouette */}
          <svg
            className="absolute bottom-0 w-full opacity-[0.28]"
            viewBox="0 0 1440 360"
            preserveAspectRatio="none"
          >
            <path
              d="M0,360 L0,220 Q120,155 240,195 Q360,235 480,165 Q600,95 720,130 Q840,165 960,105 Q1080,45 1200,85 Q1320,125 1440,80 L1440,360 Z"
              fill="#3D2810"
            />
            <path
              d="M0,360 L0,280 Q180,245 360,268 Q540,292 720,248 Q900,204 1080,240 Q1260,276 1440,255 L1440,360 Z"
              fill="#2C2416"
            />
          </svg>
          {/* Radial ember glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 65% 75%, rgba(199,91,0,0.14) 0%, transparent 50%), radial-gradient(ellipse at 15% 45%, rgba(107,91,69,0.15) 0%, transparent 45%)",
            }}
          />
        </div>
      )}

      {backgroundType === "image" && backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      {backgroundType === "video" && backgroundVideoUrl && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}

      {/* ── Dark scrim (same for all background types) ─────── */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(18,12,5,0.52)" }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div
        className="fade-up relative z-10 w-full max-w-[860px] px-8 md:px-20 py-0"
        style={{ marginLeft: 0 }}
      >
        {overline && (
          <Overline color="var(--color-sage)" className="mb-[22px]">
            {overline}
          </Overline>
        )}

        <h1
          className="text-[48px] md:text-[68px] leading-[1.04] tracking-[-0.03em] mb-[26px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-warm-cream)" }}
        >
          {headline}
        </h1>

        <p
          className="fade-up-2 text-[17px] md:text-[19px] leading-[1.68] mb-[38px] max-w-[50ch]"
          style={{ color: "rgba(237,229,212,0.72)", fontFamily: "var(--font-body)" }}
        >
          {subhead}
        </p>

        <div className="fade-up-3 flex flex-wrap gap-3.5">
          <Btn variant="primary" size="lg" href={primaryCta.href}>
            {primaryCta.label}
          </Btn>
          {secondaryCta && (
            <Btn variant="ghost" size="lg" href={secondaryCta.href}>
              {secondaryCta.label}
            </Btn>
          )}
        </div>
      </div>

      {/* ── Scroll cue ───────────────────────────────────────── */}
      <div
        className="absolute bottom-8 flex items-center gap-2.5 opacity-40"
        style={{ left: "80px" }}
      >
        <div className="w-8 h-px" style={{ background: "var(--color-warm-cream)" }} />
        <span
          className="text-[10px] tracking-[0.14em] uppercase"
          style={{ color: "var(--color-warm-cream)", fontFamily: "var(--font-body)" }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
