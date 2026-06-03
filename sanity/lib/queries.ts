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
    pageBuilder[] {
      _type,
      _key,
      _type == "block.hero" => {
        overline, headline, subhead,
        ctaLabel, ctaHref,
        secondaryCtaLabel, secondaryCtaHref,
        "backgroundImageUrl": backgroundImage.asset->url,
        backgroundImage ${imageFragment},
        backgroundVideoUrl,
        overlayOpacity
      },
      _type == "block.textMedia" => {
        overline, overlineColor, heading, paragraphs,
        ctaLabel, ctaHref, ctaVariant,
        image { asset->{ _id, url, metadata { dimensions, lqip } }, alt, hotspot, crop, caption },
        mediaPosition, backgroundColor
      },
      _type == "block.stepCards" => {
        overline, heading, layout, ctaLabel, ctaHref,
        steps[]{ n, title, body }
      },
      _type == "block.ctaStrip" => {
        headline, body, ctaLabel, ctaHref, variant,
        secondaryCtaLabel, secondaryCtaHref
      }
    }
  }
`;

// ─── About ─────────────────────────────────────────────────────────────────────

export const ABOUT_QUERY = groq`{
  "page": *[_type == "aboutPage"][0] {
    pageBuilder[] {
      _type,
      _key,
      _type == "block.pageHero" => {
        overline, headline, subhead
      },
      _type == "block.textMedia" => {
        overline, overlineColor, heading, paragraphs,
        ctaLabel, ctaHref, ctaVariant,
        image { asset->{ _id, url, metadata { dimensions, lqip } }, alt, hotspot, crop, caption },
        mediaPosition, backgroundColor
      },
      _type == "block.principleCards" => {
        overline, heading, backgroundColor,
        principles[]{ title, body }
      },
      _type == "block.teamGrid" => {
        overline, heading
      },
      _type == "block.advisoryList" => {
        overline, intro
      },
      _type == "block.fiscalSponsor" => {
        overline, body,
        logoImage { asset->{ _id, url, metadata { dimensions, lqip } }, alt }
      }
    }
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
    pageBuilder[] {
      _type,
      _key,
      _type == "block.pageHero" => {
        overline, headline, subhead
      },
      _type == "block.textMedia" => {
        overline, overlineColor, heading, paragraphs,
        ctaLabel, ctaHref, ctaVariant,
        image { asset->{ _id, url, metadata { dimensions, lqip } }, alt, hotspot, crop, caption },
        mediaPosition, backgroundColor
      },
      _type == "block.stepCards" => {
        overline, heading, layout, ctaLabel, ctaHref,
        steps[]{ n, title, body }
      },
      _type == "block.volunteerSplit" => {
        overline, heading, bodyParagraphs,
        whatTheyDo, whatTheyGet,
        ctaLabel, ctaHref
      },
      _type == "block.faqSection" => {
        overline, heading,
        "faqItems": faqs[]->{ _id, question, "answer": pt::text(answer) }
      }
    }
  }
`;

// ─── Join ──────────────────────────────────────────────────────────────────────

export const JOIN_QUERY = groq`
  *[_type == "joinPage"][0] {
    pageBuilder[] {
      _type,
      _key,
      _type == "block.pageHero" => {
        overline, headline, subhead
      },
      _type == "block.joinSignup" => {
        heading, body
      },
      _type == "block.emailSignup" => {
        overline, heading, body, ctaLabel, ctaHref, backgroundColor
      }
    }
  }
`;

// ─── Contact ───────────────────────────────────────────────────────────────────

export const CONTACT_QUERY = groq`
  *[_type == "contactPage"][0] {
    pageBuilder[] {
      _type,
      _key,
      _type == "block.pageHero" => {
        overline, headline, subhead
      },
      _type == "block.contactBody" => {
        email, location
      }
    }
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

// ─── Partners ──────────────────────────────────────────────────────────────────

export const PARTNERS_QUERY = groq`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    href
  }
`;

// ─── Site Settings ─────────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    signupUrl,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    youtubeUrl,
    nextdoorUrl
  }
`;
