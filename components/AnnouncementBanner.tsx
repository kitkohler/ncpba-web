interface Props {
  enabled?: boolean;
  text?: string | null;
  href?: string | null;
}

export default function AnnouncementBanner({ enabled, text, href }: Props) {
  if (!enabled || !text) return null;

  const dest = href || "/events";

  return (
    <a
      href={dest}
      className="block w-full text-center text-[13px] font-medium py-2.5 px-4 leading-snug"
      style={{
        backgroundColor: "var(--color-ember)",
        color: "#ffffff",
        fontFamily: "var(--font-body)",
      }}
    >
      {text}
      <span className="ml-2" aria-hidden="true">→</span>
    </a>
  );
}
