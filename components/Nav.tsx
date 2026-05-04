"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Btn from "./Btn";

interface NavLink { label: string; href: string; }

interface NavProps {
  links?: NavLink[];
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "About",        href: "/about"         },
  { label: "How It Works", href: "/how-it-works"  },
  { label: "Join",         href: "/join"           },
  { label: "Events",       href: "/events"         },
  { label: "News",         href: "/news"           },
  { label: "Contact",      href: "/contact"        },
];

export default function Nav({ links = DEFAULT_LINKS }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-[200] transition-shadow duration-[250ms]"
      style={{
        backgroundColor: "var(--color-deep-soil)",
        boxShadow: scrolled ? "var(--shadow-nav)" : "0 1px 4px rgba(44,36,22,0.20)",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-8 md:px-12">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <Image
            src="/logo-color.png"
            alt="NCPBA"
            width={38}
            height={38}
            className="block rounded-full"
          />
          <div>
            <div
              className="text-[15px] leading-[1.1] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-warm-cream)" }}
            >
              Nevada County PBA
            </div>
            <div
              className="text-[10px] leading-none"
              style={{ color: "rgba(237,229,212,0.40)", fontFamily: "var(--font-body)" }}
            >
              Good Fire with Neighbors
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-[26px] md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="no-underline text-[13px] font-medium pb-[3px] transition-colors duration-[180ms]"
                  style={{
                    color: active ? "var(--color-ember)" : "rgba(237,229,212,0.68)",
                    borderBottom: active
                      ? "1.5px solid var(--color-ember)"
                      : "1.5px solid transparent",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-warm-cream)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(237,229,212,0.68)";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Btn variant="primary" size="sm" href="/join">
            Get Involved
          </Btn>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="flex flex-col gap-[5px] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-[1.5px] w-6 bg-[var(--color-warm-cream)] transition-all duration-200"
              style={{
                opacity: mobileOpen && i === 1 ? 0 : 1,
                transform:
                  mobileOpen && i === 0
                    ? "translateY(6.5px) rotate(45deg)"
                    : mobileOpen && i === 2
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="border-t md:hidden"
          style={{
            backgroundColor: "var(--color-deep-soil)",
            borderColor: "rgba(107,91,69,0.25)",
          }}
        >
          <ul className="flex flex-col px-8 py-5 gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="no-underline text-[14px] font-medium block"
                  style={{
                    color: isActive(link.href) ? "var(--color-ember)" : "rgba(237,229,212,0.75)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Btn variant="primary" size="sm" href="/join" className="w-full">
                Get Involved
              </Btn>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
