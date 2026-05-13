"use client";

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
      { label: "Mailing List", href: "https://lp.constantcontactpages.com/sl/Uj88TTf" },
    ],
  },
];

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function NextdoorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 5.455c.904 0 1.636.732 1.636 1.636S12.904 8.727 12 8.727s-1.636-.732-1.636-1.636S11.096 5.455 12 5.455zM16.636 18.545H14.18v-5.454a2.182 2.182 0 0 0-4.363 0v5.454H7.364v-5.454a4.636 4.636 0 0 1 9.272 0v5.454z" />
    </svg>
  );
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface FooterProps {
  facebookUrl:  string | null;
  instagramUrl: string | null;
  linkedinUrl:  string | null;
  youtubeUrl:   string | null;
  nextdoorUrl:  string | null;
}

export default function Footer({
  facebookUrl,
  instagramUrl,
  linkedinUrl,
  youtubeUrl,
  nextdoorUrl,
}: FooterProps) {
  const socialLinks: SocialLink[] = [
    facebookUrl  && { href: facebookUrl,  label: "Facebook",  icon: <FacebookIcon /> },
    instagramUrl && { href: instagramUrl, label: "Instagram", icon: <InstagramIcon /> },
    linkedinUrl  && { href: linkedinUrl,  label: "LinkedIn",  icon: <LinkedinIcon /> },
    youtubeUrl   && { href: youtubeUrl,   label: "YouTube",   icon: <YoutubeIcon /> },
    nextdoorUrl  && { href: nextdoorUrl,  label: "Nextdoor",  icon: <NextdoorIcon /> },
  ].filter(Boolean) as SocialLink[];

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

          {/* Join CTA */}
          <div className="mb-6">
            <a
              href="https://groups.io/g/ncpba/join"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 font-semibold rounded-[4px] border-[1.5px] cursor-pointer select-none whitespace-nowrap transition-all duration-[180ms] ease-out hover:brightness-90 hover:-translate-y-px active:brightness-[0.82] active:scale-[0.98] px-[22px] py-[10px] text-[14px]"
              style={{
                backgroundColor: "var(--color-ember)",
                color: "white",
                borderColor: "transparent",
                fontFamily: "var(--font-body)",
                textDecoration: "none",
              }}
            >
              Join the NCPBA Community
            </a>
          </div>

          {/* Social icons — only rendered when at least one URL is configured */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3.5" style={{ color: "var(--color-warm-cream)" }}>
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          )}
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
