import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// Update this when the signup destination changes in code.
// Can also be overridden via siteSettings.signupUrl in Sanity Studio.
const SIGNUP_URL_FALLBACK = "https://form.typeform.com/to/IUcXpMZu";

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
