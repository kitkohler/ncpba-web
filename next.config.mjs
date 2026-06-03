/** @type {import('next').NextConfig} */

// Hardcoded fallback — update this when the signup destination changes in code.
// At runtime the route handler at app/signup/route.ts takes precedence and will
// use siteSettings.signupUrl from Sanity if that field is populated.
const SIGNUP_URL_FALLBACK = "https://form.typeform.com/to/IUcXpMZu";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/signup",
        destination: SIGNUP_URL_FALLBACK,
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
