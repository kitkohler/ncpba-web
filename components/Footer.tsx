import Link from "next/link";
import Image from "next/image";

const FOOTER_COLS = [
  {
    title: "Organization",
    links: [
      { label: "About",       href: "/about"        },
      { label: "How It Works",href: "/how-it-works" },
      { label: "Join",        href: "/join"          },
      { label: "Contact",     href: "/contact"       },
    ],
  },
  {
    title: "Prescribed Fire",
    links: [
      { label: "What is RxFire?",  href: "/how-it-works" },
      { label: "For Landowners",   href: "/how-it-works" },
      { label: "For Volunteers",   href: "/how-it-works" },
      { label: "FAQs",             href: "/how-it-works" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Events",       href: "/events" },
      { label: "News",         href: "/news"   },
      { label: "Get Involved", href: "/join"   },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-deep-soil)", color: "var(--color-warm-cream)" }}>
      {/* Main grid */}
      <div className="mx-auto max-w-[1200px] px-8 md:px-12 py-16 grid grid-cols-1 gap-12 md:grid-cols-[1.8fr_1fr_1fr_1fr] md:gap-12">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Image
              src="/logo-color.png"
              alt="NCPBA"
              width={36}
              height={36}
              className="block rounded-full shrink-0"
            />
            <div>
              <div
                className="text-[15px] leading-[1.1] tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Nevada County PBA
              </div>
              <div
                className="text-[10px] leading-none mt-0.5"
                style={{ color: "rgba(237,229,212,0.38)", fontFamily: "var(--font-body)" }}
              >
                Good Fire with Neighbors · Safely, Legally, Responsibly
              </div>
            </div>
          </div>

          <p
            className="text-[13px] leading-[1.7] mb-1"
            style={{ color: "rgba(237,229,212,0.50)", fontFamily: "var(--font-body)" }}
          >
            info@nevadacountypba.org
          </p>
          <p
            className="text-[13px] leading-[1.7] mb-6"
            style={{ color: "rgba(237,229,212,0.50)", fontFamily: "var(--font-body)" }}
          >
            Nevada County, CA
          </p>

          {/* Newsletter subscribe */}
          <div
            className="text-[11px] font-bold tracking-[0.06em] uppercase mb-2"
            style={{ color: "rgba(237,229,212,0.38)", fontFamily: "var(--font-body)" }}
          >
            Stay in the loop
          </div>
          <div className="flex">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-44 text-[13px] outline-none"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(107,91,69,0.38)",
                borderRight: "none",
                borderRadius: "4px 0 0 4px",
                padding: "9px 13px",
                color: "var(--color-warm-cream)",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              className="text-[13px] font-semibold px-3.5 whitespace-nowrap"
              style={{
                background: "var(--color-ember)",
                color: "white",
                border: "none",
                borderRadius: "0 4px 4px 0",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <div
              className="text-[10px] font-bold tracking-[0.08em] uppercase mb-4"
              style={{ color: "rgba(237,229,212,0.32)", fontFamily: "var(--font-body)" }}
            >
              {col.title}
            </div>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] no-underline transition-colors duration-200"
                    style={{ color: "rgba(237,229,212,0.58)", fontFamily: "var(--font-body)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-warm-cream)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(237,229,212,0.58)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(107,91,69,0.20)" }}
      >
        <div className="mx-auto max-w-[1200px] px-8 md:px-12 py-5 flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <span
            className="text-[12px]"
            style={{ color: "rgba(237,229,212,0.28)", fontFamily: "var(--font-body)" }}
          >
            © 2025 Nevada County Prescribed Burn Association · A fiscally sponsored project of NCRCD
          </span>
          <div className="flex gap-5">
            {[["Privacy", "/contact"], ["Contact", "/contact"]].map(([l, href]) => (
              <Link
                key={l}
                href={href}
                className="text-[12px] no-underline"
                style={{ color: "rgba(237,229,212,0.28)", fontFamily: "var(--font-body)" }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
