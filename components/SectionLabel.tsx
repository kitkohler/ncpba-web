interface SectionLabelProps {
  overline?: string;
  heading?: string;
  body?: string;
  /** "left" | "center" — defaults to "left" */
  align?: "left" | "center";
  className?: string;
}

export default function SectionLabel({
  overline,
  heading,
  body,
  align = "left",
  className = "",
}: SectionLabelProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {overline && (
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-ember)" }}
        >
          {overline}
        </p>
      )}
      {heading && (
        <h2
          className="text-3xl font-bold leading-tight md:text-4xl"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-deep-soil)" }}
        >
          {heading}
        </h2>
      )}
      {body && (
        <p
          className="mt-4 text-base leading-relaxed md:text-lg"
          style={{ color: "var(--color-oak-bark)" }}
        >
          {body}
        </p>
      )}
    </div>
  );
}
