/**
 * Migration: convert old flat page fields → pageBuilder blocks.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<token> node scripts/migrate-to-page-builder.mjs
 *   SANITY_API_WRITE_TOKEN=<token> node scripts/migrate-to-page-builder.mjs --force
 *
 * Without --force, skips any page that already has pageBuilder content.
 * Get a write token from:
 *   sanity.io/manage → project 2r7xt8dx → API → Tokens → Add API Token (Editor)
 */

import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("❌  SANITY_API_WRITE_TOKEN environment variable is required.");
  process.exit(1);
}

const FORCE = process.argv.includes("--force");

const client = createClient({
  projectId: "2r7xt8dx",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function key(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Per-page transformers ─────────────────────────────────────────────────────

function buildHomePageBlocks(doc) {
  const blocks = [];

  if (doc.hero) {
    blocks.push({
      _type: "block.hero",
      _key: key("hero"),
      overline:            doc.hero.overline,
      headline:            doc.hero.headline,
      subhead:             doc.hero.subhead,
      ctaLabel:            doc.hero.ctaLabel,
      ctaHref:             doc.hero.ctaHref,
      secondaryCtaLabel:   doc.hero.secondaryCtaLabel,
      secondaryCtaHref:    doc.hero.secondaryCtaHref,
      // Map old field names to new block field names
      backgroundVideoUrl:  doc.hero.heroBackgroundVideoUrl,
      overlayOpacity:      doc.hero.heroOverlayOpacity ?? 50,
      ...(doc.hero.heroBackgroundImage ? { backgroundImage: doc.hero.heroBackgroundImage } : {}),
    });
  }

  if (doc.whatWeDoSection) {
    blocks.push({
      _type:           "block.textMedia",
      _key:            key("whatWeDo"),
      overline:        doc.whatWeDoSection.overline,
      overlineColor:   "ember",
      heading:         doc.whatWeDoSection.heading,
      paragraphs:      doc.whatWeDoSection.paragraphs ?? [],
      ctaLabel:        "How It Works",
      ctaHref:         "/how-it-works",
      ctaVariant:      "primary",
      mediaPosition:   "right",
      backgroundColor: "warm-cream",
    });
  }

  if (doc.whereWeWorkSection) {
    blocks.push({
      _type:           "block.textMedia",
      _key:            key("whereWeWork"),
      overline:        doc.whereWeWorkSection.overline,
      overlineColor:   "sage",
      heading:         doc.whereWeWorkSection.heading,
      paragraphs:      doc.whereWeWorkSection.paragraphs ?? [],
      mediaPosition:   "left",
      backgroundColor: "sand",
      ...(doc.whereWeWorkSection.image ? { image: doc.whereWeWorkSection.image } : {}),
    });
  }

  if (doc.howItWorksTeaserSteps?.length || doc.howItWorksTeaserSection) {
    blocks.push({
      _type:    "block.stepCards",
      _key:     key("howItWorks"),
      overline: doc.howItWorksTeaserSection?.overline ?? "How It Works",
      heading:  "You're not hiring a service.\nYou're joining a community.",
      layout:   "grid",
      ctaLabel: "See the full model →",
      ctaHref:  "/how-it-works",
      steps: (doc.howItWorksTeaserSteps ?? []).map((s) => ({
        ...s,
        _key: s._key ?? key("step"),
      })),
    });
  }

  if (doc.ctaStrip) {
    blocks.push({
      _type:    "block.ctaStrip",
      _key:     key("ctaStrip"),
      headline: doc.ctaStrip.headline,
      body:     doc.ctaStrip.body,
      variant:  "deep-soil",
    });
  }

  return blocks;
}

function buildAboutPageBlocks(doc) {
  const blocks = [];

  if (doc.hero) {
    blocks.push({
      _type:    "block.pageHero",
      _key:     key("hero"),
      overline: doc.hero.overline,
      headline: doc.hero.headline,
      subhead:  doc.hero.subhead,
    });
  }

  if (doc.missionVision) {
    blocks.push({
      _type:           "block.textMedia",
      _key:            key("missionVision"),
      overline:        doc.missionVision.overline,
      overlineColor:   "sage",
      heading:         doc.missionVision.heading,
      paragraphs:      doc.missionVision.paragraphs ?? [],
      mediaPosition:   "right",
      backgroundColor: "warm-cream",
    });
  }

  if (doc.howWeWorkSection || doc.howWeWorkPrinciples?.length) {
    blocks.push({
      _type:           "block.principleCards",
      _key:            key("howWeWork"),
      overline:        doc.howWeWorkSection?.overline,
      heading:         doc.howWeWorkSection?.heading,
      backgroundColor: "sand",
      principles: (doc.howWeWorkPrinciples ?? []).map((p) => ({
        ...p,
        _key: p._key ?? key("p"),
      })),
    });
  }

  if (doc.teamSection) {
    blocks.push({
      _type:    "block.teamGrid",
      _key:     key("team"),
      overline: doc.teamSection.overline,
      heading:  doc.teamSection.heading,
    });
  }

  if (doc.advisorySection) {
    blocks.push({
      _type:    "block.advisoryList",
      _key:     key("advisory"),
      overline: doc.advisorySection.overline,
      intro:    doc.advisorySection.intro,
    });
  }

  if (doc.fiscalSponsorBody) {
    blocks.push({
      _type: "block.fiscalSponsor",
      _key:  key("fiscal"),
      body:  doc.fiscalSponsorBody,
    });
  }

  return blocks;
}

function buildHowItWorksPageBlocks(doc) {
  const blocks = [];

  if (doc.hero) {
    blocks.push({
      _type:    "block.pageHero",
      _key:     key("hero"),
      overline: doc.hero.overline,
      headline: doc.hero.headline,
      subhead:  doc.hero.subhead,
    });
  }

  if (doc.introSection) {
    blocks.push({
      _type:           "block.textMedia",
      _key:            key("model"),
      overline:        doc.introSection.overline,
      overlineColor:   "sage",
      heading:         doc.introSection.heading,
      paragraphs: [
        "A lot of people hear \"burn association\" and imagine a crew you call when you want your land burned. That's not what this is.",
        "NCPBA is a mutual aid network. Landowners plan and conduct their own burns. Volunteers support those burns with trained hands and shared equipment. And everyone who benefits from the network is expected to contribute to it — showing up for neighbors, building skills, and helping the community grow.",
        "The more members participate, the stronger the network gets. More trained volunteers means more burns supported. More burns means more local knowledge. More local knowledge means safer, more effective fire on the landscape.",
      ],
      backgroundColor: "warm-cream",
      mediaPosition:   "right",
    });
  }

  if (doc.landOwnerSection) {
    blocks.push({
      _type:    "block.stepCards",
      _key:     key("landowners"),
      overline: doc.landOwnerSection.overline,
      heading:  doc.landOwnerSection.heading,
      layout:   "list",
      ctaLabel: "Connect with NCPBA",
      ctaHref:  "/join",
      steps: [
        { _key: "s1", n: "1", title: "Connect with NCPBA",  body: "Reach out to start a conversation about your property, your goals, and whether prescribed fire is the right tool for your situation." },
        { _key: "s2", n: "2", title: "Plan your burn",       body: "Work with NCPBA and, where applicable, with CAL FIRE and other partners to develop a burn plan appropriate for your land and the current conditions. We help you navigate permitting and timing." },
        { _key: "s3", n: "3", title: "Pick your burn day",   body: "When conditions are right and permits are in order, NCPBA mobilizes volunteers and equipment to support your burn. You're the burn boss. We're your crew." },
        { _key: "s4", n: "4", title: "Pay it forward",       body: "Landowners who burn with NCPBA support are expected to show up for neighbors when the time comes. That's the agreement that makes all of this possible." },
      ],
    });
  }

  if (doc.volunteerSection) {
    blocks.push({
      _type:          "block.volunteerSplit",
      _key:           key("volunteers"),
      overline:       doc.volunteerSection.overline,
      heading:        doc.volunteerSection.heading,
      bodyParagraphs: [
        "NCPBA volunteers come from all backgrounds. Some are experienced firefighters. Some have never held a drip torch. What matters is that you show up, follow direction, and take the work seriously.",
        "We offer training pathways to build your skills over time, and we track certifications so you're prepared for increasingly complex roles as you gain experience.",
      ],
      whatTheyDo: ["Fuel preparation", "Holding lines during burns", "Equipment operation", "Post-burn monitoring and mop-up", "Showing up for neighbors"],
      whatTheyGet: ["Training", "Experience", "Gear access", "The satisfaction of doing real ecological work in the place you live"],
      ctaLabel: "Join as a Volunteer",
      ctaHref:  "/join",
    });
  }

  if (doc.faqSection || doc.faqs?.length) {
    blocks.push({
      _type:    "block.faqSection",
      _key:     key("faq"),
      overline: doc.faqSection?.overline,
      heading:  doc.faqSection?.heading,
      faqs:     doc.faqs ?? [],
    });
  }

  return blocks;
}

function buildJoinPageBlocks(doc) {
  const blocks = [];

  if (doc.hero) {
    blocks.push({
      _type:    "block.pageHero",
      _key:     key("hero"),
      overline: doc.hero.overline,
      headline: doc.hero.headline,
      subhead:  doc.hero.subhead,
    });
  }

  blocks.push({ _type: "block.joinSignup", _key: key("joinSignup") });

  blocks.push({
    _type:           "block.emailSignup",
    _key:            key("emailSignup"),
    overline:        "Stay in the Loop",
    heading:         doc.emailSignupHeading ?? "Not ready to jump in yet?",
    body:            doc.emailSignupBody    ?? "Sign up for occasional updates on burns, training opportunities, and NCPBA news.",
    ctaLabel:        "Join the mailing list",
    ctaHref:         "https://lp.constantcontactpages.com/sl/Uj88TTf",
    backgroundColor: "sand",
  });

  return blocks;
}

function buildContactPageBlocks(doc) {
  const blocks = [];

  if (doc.hero) {
    blocks.push({
      _type:    "block.pageHero",
      _key:     key("hero"),
      overline: doc.hero.overline,
      headline: doc.hero.headline,
      subhead:  doc.hero.subhead,
    });
  }

  blocks.push({
    _type:    "block.contactBody",
    _key:     key("contact"),
    email:    doc.email    ?? "info@nevadacountypba.org",
    location: doc.location ?? "Nevada County, California",
  });

  return blocks;
}

// ─── Old fields to remove after migration ─────────────────────────────────────

const OLD_FIELDS = {
  homePage:       ["hero", "whatWeDoSection", "whereWeWorkSection", "howItWorksTeaserSection", "howItWorksTeaserSteps", "ctaStrip"],
  aboutPage:      ["hero", "missionVision", "howWeWorkSection", "howWeWorkPrinciples", "teamSection", "advisorySection", "fiscalSponsorBody"],
  howItWorksPage: ["hero", "introSection", "landOwnerSection", "volunteerSection", "faqSection", "faqs"],
  joinPage:       ["hero", "emailSignupHeading", "emailSignupBody"],
  contactPage:    ["hero", "email", "location"],
};

const PAGE_BUILDERS = {
  homePage:       buildHomePageBlocks,
  aboutPage:      buildAboutPageBlocks,
  howItWorksPage: buildHowItWorksPageBlocks,
  joinPage:       buildJoinPageBlocks,
  contactPage:    buildContactPageBlocks,
};

// ─── Run migration ─────────────────────────────────────────────────────────────

async function migrate() {
  const docIds = Object.keys(PAGE_BUILDERS);
  console.log(`Migrating ${docIds.length} page documents to pageBuilder…\n`);

  for (const docId of docIds) {
    const doc = await client.getDocument(docId);
    if (!doc) {
      console.log(`  ⚠️  ${docId} — not found in Sanity, skipping`);
      continue;
    }

    const hasExistingBlocks = Array.isArray(doc.pageBuilder) && doc.pageBuilder.length > 0;
    if (hasExistingBlocks && !FORCE) {
      console.log(`  ⏭  ${docId} — already has ${doc.pageBuilder.length} block(s), skipping (use --force to override)`);
      continue;
    }

    const blocks = PAGE_BUILDERS[docId](doc);
    if (blocks.length === 0) {
      console.log(`  ⚠️  ${docId} — no old fields found to migrate, skipping`);
      continue;
    }

    await client
      .patch(docId)
      .set({ pageBuilder: blocks })
      .unset(OLD_FIELDS[docId])
      .commit({ autoGenerateArrayKeys: false });

    console.log(`  ✓  ${docId} — migrated ${blocks.length} block(s), removed ${OLD_FIELDS[docId].length} old field(s)`);
  }

  console.log("\nDone. Open /studio to review and publish each page.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
