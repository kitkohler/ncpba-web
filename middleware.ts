import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Hardcoded so middleware (Edge Runtime) doesn't need to import next.config.mjs
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "2r7xt8dx";
const DATASET   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production";
const CACHE_TTL = 60_000; // ms — re-fetch redirects at most once per minute

interface SanityRedirect {
  source:      string;
  destination: string;
  permanent:   boolean;
}

// Module-level cache — persists across requests within the same Edge worker instance
let cache: { redirects: SanityRedirect[]; fetchedAt: number } | null = null;

async function getRedirects(): Promise<SanityRedirect[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return cache.redirects;
  }
  try {
    const query = encodeURIComponent(
      '*[_type == "redirect" && defined(source) && defined(destination)]{ source, destination, "permanent": coalesce(permanent, true) }'
    );
    const res = await fetch(
      `https://${PROJECT_ID}.apicdn.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const json = await res.json();
      cache = { redirects: json.result ?? [], fetchedAt: Date.now() };
    }
  } catch {
    // Sanity unreachable — keep serving stale cache if we have it
  }
  return cache?.redirects ?? [];
}

export async function middleware(request: NextRequest) {
  const redirects = await getRedirects();
  const { pathname } = request.nextUrl;

  const match = redirects.find((r) => r.source === pathname);
  if (match) {
    const destination = match.destination.startsWith("http")
      ? match.destination
      : new URL(match.destination, request.url).toString();
    return NextResponse.redirect(destination, { status: match.permanent ? 308 : 307 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals, static assets, and the Sanity Studio
    "/((?!_next/static|_next/image|favicon\\.ico|studio).*)",
  ],
};
