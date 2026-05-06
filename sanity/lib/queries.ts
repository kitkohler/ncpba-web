import { groq } from "next-sanity";

// ─── Shared fragments ──────────────────────────────────────────────────────────

const imageFragment = groq`{
  asset->{ _id, url, metadata { dimensions, lqip } },
  alt,
  hotspot,
  crop
}`;

// ─── Home ──────────────────────────────────────────────────────────────────────

export const HOME_QUERY = groq`
  *[_type == "homePage"][0] {
    hero {
      overline,
      headline,
      subhead,
      ctaLabel,
      ctaHref,
      secondaryCtaLabel,
      secondaryCtaHref,
      heroBackgroundImage ${imageFragment},
      heroBackgroundVideoUrl,
      heroOverlayOpacity
    },
    whatWeDoSection { overline, heading, paragraphs },
    whereWeWorkSection { overline, heading, paragraphs },
    howItWorksTeaserSection { overline },
    howItWorksTeaserSteps[] { n, title, body },
    ctaStrip { headline, body }
  }
`;

// ─── About ─────────────────────────────────────────────────────────────────────

export const ABOUT_QUERY = groq`{
  "page": *[_type == "aboutPage"][0] {
    hero { overline, headline, subhead },
    missionVision { overline, heading, paragraphs },
    howWeWorkSection { overline, heading },
    howWeWorkPrinciples[] { title, body },
    teamSection { overline, heading },
    advisorySection { overline, intro },
    fiscalSponsorBody
  },
  "boardMembers": *[_type == "boardMember"] | order(order asc) {
    _id, name, role, bio
  },
  "advisoryMembers": *[_type == "advisoryCouncilMember"] | order(order asc) {
    _id, name, "note": affiliation
  }
}`;

// ─── How It Works ──────────────────────────────────────────────────────────────

export const HOW_IT_WORKS_QUERY = groq`
  *[_type == "howItWorksPage"][0] {
    hero { overline, headline, subhead },
    introSection { overline, heading },
    landOwnerSection { overline, heading },
    volunteerSection { overline, heading },
    faqSection { overline, heading },
    "faqItems": faqs[]-> {
      _id,
      question,
      "answer": pt::text(answer)
    }
  }
`;

// ─── Join ──────────────────────────────────────────────────────────────────────

export const JOIN_QUERY = groq`
  *[_type == "joinPage"][0] {
    hero { overline, headline, subhead },
    emailSignupHeading,
    emailSignupBody
  }
`;

// ─── Contact ───────────────────────────────────────────────────────────────────

export const CONTACT_QUERY = groq`
  *[_type == "contactPage"][0] {
    hero { overline, headline, subhead },
    email,
    location
  }
`;

// ─── Events ────────────────────────────────────────────────────────────────────

export const EVENTS_QUERY = groq`
  *[_type == "events"][0] {
    comingSoonHeadline,
    comingSoonBody,
    notifyCtaLabel,
    notifyCtaHref
  }
`;

// ─── News ──────────────────────────────────────────────────────────────────────

export const NEWS_INDEX_QUERY = groq`
  *[_type == "newsPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    category,
    excerpt,
    coverImage ${imageFragment}
  }
`;

export const NEWS_POST_QUERY = groq`
  *[_type == "newsPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    excerpt,
    coverImage ${imageFragment},
    body
  }
`;

export const NEWS_POST_SLUGS_QUERY = groq`
  *[_type == "newsPost" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// ─── Site Settings ─────────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    youtubeUrl,
    nextdoorUrl
  }
`;
