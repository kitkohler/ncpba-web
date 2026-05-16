import HeroBlockBase from "@/components/HeroBlock";

interface Props {
  overline?: string;
  headline?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
  overlayOpacity?: number;
}

const COPY = {
  overline: "Nevada County · Sierra Nevada Foothills · California",
  headline: (
    <>
      Good Fire with<br />
      <span style={{ color: "var(--color-ember)" }}>Neighbors.</span>
    </>
  ),
  subhead:
    "The Nevada County Prescribed Burn Association is a community of landowners and volunteers who support each other's burns, share equipment, and build the local knowledge that makes prescribed fire safe and achievable in the Sierra Nevada foothills.",
  ctaLabel: "Get Involved",
  ctaHref: "/join",
  secondaryCtaLabel: "Learn About Prescribed Fire",
  secondaryCtaHref: "/how-it-works",
};

export default function HeroBlock(props: Props) {
  return (
    <HeroBlockBase
      overline={props.overline ?? COPY.overline}
      headline={props.headline ?? COPY.headline}
      subhead={props.subhead ?? COPY.subhead}
      primaryCta={{
        label: props.ctaLabel ?? COPY.ctaLabel,
        href: props.ctaHref ?? COPY.ctaHref,
      }}
      secondaryCta={
        props.secondaryCtaLabel
          ? { label: props.secondaryCtaLabel, href: props.secondaryCtaHref ?? "/" }
          : { label: COPY.secondaryCtaLabel, href: COPY.secondaryCtaHref }
      }
      backgroundImageUrl={props.backgroundImageUrl}
      backgroundVideoUrl={props.backgroundVideoUrl}
      overlayOpacity={props.overlayOpacity}
    />
  );
}
