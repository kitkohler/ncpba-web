import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { SIGNUP_URL_FALLBACK } from "../../next.config.mjs";

// Re-check Sanity at most once per minute
export const revalidate = 60;

export async function GET() {
  let destination: string = SIGNUP_URL_FALLBACK;

  try {
    const settings = await client.fetch<{ signupUrl?: string }>(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{ signupUrl }`
    );
    if (settings?.signupUrl) {
      destination = settings.signupUrl;
    }
  } catch {
    // Sanity unreachable — fall back to hardcoded URL
  }

  return NextResponse.redirect(destination, { status: 308 });
}
