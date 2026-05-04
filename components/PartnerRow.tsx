import Image from "next/image";

interface Partner {
  name: string;
  logoUrl?: string;
  href?: string;
}

interface PartnerRowProps {
  partners?: Partner[];
  heading?: string;
}

export default function PartnerRow({ partners = [], heading }: PartnerRowProps) {
  if (!partners.length) return null;

  return (
    <section className="w-full py-16" style={{ backgroundColor: "var(--color-warm-cream)" }}>
      <div className="mx-auto max-w-7xl px-6">
        {heading && (
          <p
            className="mb-10 text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-smoke)" }}
          >
            {heading}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {partners.map((p) => {
            const content = p.logoUrl ? (
              <Image
                src={p.logoUrl}
                alt={p.name}
                width={120}
                height={48}
                className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-oak-bark)" }}
              >
                {p.name}
              </span>
            );

            return p.href ? (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.name}
              >
                {content}
              </a>
            ) : (
              <div key={p.name}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
