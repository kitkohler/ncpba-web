"use client";

import Link from "next/link";

type BtnVariant = "primary" | "secondary" | "outline" | "ghost" | "ghost-light" | "eco" | "white";
type BtnSize    = "lg" | "md" | "sm";

interface BtnProps {
  variant?: BtnVariant;
  size?: BtnSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const SIZES: Record<BtnSize, string> = {
  lg: "px-7 py-3 text-[15px]",
  md: "px-[22px] py-[10px] text-[14px]",
  sm: "px-4 py-[7px] text-[13px]",
};

const VARIANTS: Record<BtnVariant, string> = {
  primary:      "bg-ember text-white border-transparent",
  secondary:    "bg-deep-soil text-warm-cream border-transparent",
  outline:      "bg-transparent text-ember border-ember",
  ghost:        "bg-transparent text-warm-cream border-[rgba(237,229,212,0.35)]",
  "ghost-light":"bg-transparent text-deep-soil border-[rgba(107,91,69,0.35)]",
  eco:          "bg-sage text-white border-transparent",
  white:        "bg-white text-ember border-transparent",
};

export default function Btn({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  type = "button",
  onClick,
}: BtnProps) {
  const base = `
    inline-flex items-center justify-center gap-1.5 font-semibold rounded-[4px]
    border-[1.5px] cursor-pointer select-none whitespace-nowrap
    transition-all duration-[180ms] ease-out
    hover:brightness-90 hover:-translate-y-px
    active:brightness-[0.82] active:scale-[0.98]
    ${SIZES[size]} ${VARIANTS[variant]} ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {children}
    </button>
  );
}
