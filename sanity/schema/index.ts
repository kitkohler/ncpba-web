import { allBlocks } from "./blocks";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { howItWorksPage } from "./howItWorksPage";
import { joinPage } from "./joinPage";
import { contactPage } from "./contactPage";
import { events } from "./events";
import { newsPost } from "./newsPost";
import { boardMember } from "./boardMember";
import { advisoryCouncilMember } from "./advisoryCouncilMember";
import { partner } from "./partner";
import { faqItem } from "./faqItem";
import { siteSettings } from "./siteSettings";
import { redirect } from "./redirect";

export const schemaTypes = [
  // Blocks (registered globally so page schemas can reference them)
  ...allBlocks,
  // Global
  siteSettings,
  redirect,
  // Singleton pages
  homePage,
  aboutPage,
  howItWorksPage,
  joinPage,
  contactPage,
  events,
  // Collections
  newsPost,
  boardMember,
  advisoryCouncilMember,
  partner,
  faqItem,
];
