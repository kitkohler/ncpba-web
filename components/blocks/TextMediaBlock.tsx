import Image from "next/image";
import Overline from "@/components/Overline";
import Btn from "@/components/Btn";

interface SanityImage {
  asset?: { _id: string; url: string; metadata?: { dimensions?: unknown; lqip?: string } };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
  caption?: string;
}

interface Props {
  overline?: string;
  overlineColor?: "ember" | "sage" | "smoke";
  heading?: string;
  paragraphs?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: "primary" | "outline" | "ghost";
  image?: SanityImage;
  mediaPosition?: "left" | "right";
  backgroundColor?: "warm-cream" | "sand" | "deep-soil";
  // Fallback copy injected by FALLBACK_BLOCKS in page.tsx
  _fallbackHeadline?: string;
  _fallbackParagraphs?: string[];
  _fallbackCtaLabel?: string;
  _fallbackCtaHref?: string;
  _fallbackSecondaryCtaLabel?: string;
  _fallbackSecondaryCtaHref?: string;
  _fallbackSecondaryCtaVariant?: "primary" | "outline" | "ghost";
  _videoPlaceholder?: boolean;
}

const BG_COLORS: Record<string, string> = {
  "warm-cream": "var(--color-warm-cream)",
  sand: "var(--color-sand)",
  "deep-soil": "var(--color-deep-soil)",
};

const OVERLINE_COLORS: Record<string, string> = {
  ember: "var(--color-ember)",
  sage: "var(--color-sage)",
  smoke: "var(--color-smoke)",
};

export default function TextMediaBlock(props: Props) {
  const bg = BG_COLORS[props.backgroundColor ?? "warm-cream"] ?? "var(--color-warm-cream)";
  const overlineColor = OVERLINE_COLORS[props.overlineColor ?? "sage"] ?? "var(--color-sage)";
  const mediaLeft = props.mediaPosition === "left";
  const paragraphs = props.paragraphs?.length ? props.paragraphs : (props._fallbackParagraphs ?? []);
  const heading = props.heading ?? props._fallbackHeadline;

  const imageEl = props.image?.asset?.url ? (
    <div className="rounded-lg overflow-hidden relative" style={{ height: 420 }}>
      <Image
        src={props.image.asset.url}
        alt={props.image.alt ?? ""}
        fill
        className="object-cover"
      />
      {props.image.caption && (
        <div className="absolute bottom-6 left-6">
          <p
            className="text-[13px] italic"
            style={{ color: "rgba(237,229,212,0.75)", fontFamily: "var(--font-display)" }}
          >
            {props.image.caption}
          </p>
        </div>
      )}
    </div>
  ) : props._videoPlaceholder ? (
    /* Video placeholder — same as About page Who We Are section */
    <div
      className="rounded-[6px] overflow-hidden relative cursor-pointer"
      style={{ aspectRatio: "16/9", backgroundColor: "#1a150e" }}
    >
      <svg className="absolute bottom-0 w-full opacity-20" viewBox="0 0 800 200" preserveAspectRatio="none">
        <path
          d="M0,200 L0,120 Q80,80 160,110 Q240,140 320,90 Q400,40 480,70 Q560,100 640,60 Q720,20 800,50 L800,200 Z"
          fill="#6B5B45"
        />
        <path
          d="M0,200 L0,155 Q100,130 200,150 Q300,170 400,135 Q500,100 600,125 Q700,150 800,130 L800,200 Z"
          fill="#2C2416"
        />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(199,91,0,0.18) 0%, transparent 65%), radial-gradient(ellipse at 70% 30%, rgba(107,91,69,0.25) 0%, transparent 55%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "rgba(199,91,0,0.9)",
            boxShadow: "0 4px 24px rgba(199,91,0,0.45)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
      <div
        className="absolute bottom-4 left-5 text-[12px] font-medium"
        style={{ color: "rgba(237,229,212,0.65)", fontFamily: "var(--font-body)" }}
      >
        Community interview: why NCPBA exists
      </div>
    </div>
  ) : (
    /* Landscape placeholder — same as Where We Work fallback */
    <div
      className="rounded-lg overflow-hidden relative"
      style={{
        height: 420,
        background: "linear-gradient(150deg, #3D3220 0%, #6B5B45 55%, #8B7355 100%)",
      }}
    >
      <svg className="absolute bottom-0 w-full opacity-45" viewBox="0 0 600 220" preserveAspectRatio="none">
        <path
          d="M0,220 L0,150 Q60,110 120,140 Q180,170 240,120 Q300,70 360,100 Q420,130 480,80 Q540,30 600,60 L600,220 Z"
          fill="#2C2416"
        />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 35% 50%, rgba(199,91,0,0.12) 0%, transparent 60%)",
        }}
      />
      <div className="absolute bottom-6 left-6">
        <p
          className="text-[13px] italic"
          style={{ color: "rgba(237,229,212,0.45)", fontFamily: "var(--font-display)" }}
        >
          Oak woodland, Sierra Nevada foothills — Nevada County, CA
        </p>
      </div>
    </div>
  );

  const textEl = (
    <div>
      {props.overline && (
        <Overline color={overlineColor}>{props.overline}</Overline>
      )}
      {heading && (
        <h2
          className="text-[30px] md:text-[38px] leading-[1.1] tracking-[-0.02em] mb-[26px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
        >
          {heading}
        </h2>
      )}
      {paragraphs.length > 0 && (
        <div className="flex flex-col gap-[18px] mb-7">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-[16px] leading-[1.75]"
              style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
            >
              {para}
            </p>
          ))}
        </div>
      )}
      {props.ctaLabel && props.ctaHref && (
        <div className="flex gap-3 flex-wrap">
          <Btn variant={props.ctaVariant ?? "primary"} href={props.ctaHref}>
            {props.ctaLabel}
          </Btn>
          {props._fallbackSecondaryCtaLabel && props._fallbackSecondaryCtaHref && (
            <Btn variant={props._fallbackSecondaryCtaVariant ?? "outline"} href={props._fallbackSecondaryCtaHref}>
              {props._fallbackSecondaryCtaLabel}
            </Btn>
          )}
        </div>
      )}
      {!props.ctaLabel && props._fallbackCtaLabel && props._fallbackCtaHref && (
        <div className="flex gap-3 flex-wrap">
          <Btn variant={props.ctaVariant ?? "primary"} href={props._fallbackCtaHref}>
            {props._fallbackCtaLabel}
          </Btn>
          {props._fallbackSecondaryCtaLabel && props._fallbackSecondaryCtaHref && (
            <Btn variant={props._fallbackSecondaryCtaVariant ?? "outline"} href={props._fallbackSecondaryCtaHref}>
              {props._fallbackSecondaryCtaLabel}
            </Btn>
          )}
        </div>
      )}
    </div>
  );

  const hasMedia = !!(props.image?.asset?.url || props._videoPlaceholder || true);

  return (
    <section className="py-[96px] px-8 md:px-16" style={{ backgroundColor: bg }}>
      <div
        className={
          hasMedia
            ? "mx-auto max-w-[1200px] grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-[72px] items-center"
            : "mx-auto max-w-[1200px]"
        }
      >
        {mediaLeft ? (
          <>
            {imageEl}
            {textEl}
          </>
        ) : (
          <>
            {textEl}
            {imageEl}
          </>
        )}
      </div>
    </section>
  );
}
