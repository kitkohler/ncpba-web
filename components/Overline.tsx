interface OverlineProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Overline({ children, color, className = "" }: OverlineProps) {
  return (
    <div
      className={`text-[11px] font-bold tracking-[0.09em] uppercase mb-3.5 ${className}`}
      style={{
        fontFamily: "var(--font-body)",
        color: color ?? "var(--color-sage)",
      }}
    >
      {children}
    </div>
  );
}
