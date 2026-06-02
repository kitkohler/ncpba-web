import HeroBlock from "@/components/blocks/HeroBlock";
import PageHeroBlock from "@/components/blocks/PageHeroBlock";
import TextMediaBlock from "@/components/blocks/TextMediaBlock";
import StepCardsBlock from "@/components/blocks/StepCardsBlock";
import PrincipleCardsBlock from "@/components/blocks/PrincipleCardsBlock";
import CTAStripBlock from "@/components/blocks/CTAStripBlock";
import TeamGridBlock from "@/components/blocks/TeamGridBlock";
import AdvisoryListBlock from "@/components/blocks/AdvisoryListBlock";
import FiscalSponsorBlock from "@/components/blocks/FiscalSponsorBlock";
import VolunteerSplitBlock from "@/components/blocks/VolunteerSplitBlock";
import LandownerStepsBlock from "@/components/blocks/LandownerStepsBlock";
import FAQSectionBlock from "@/components/blocks/FAQSectionBlock";
import JoinSignupBlock from "@/components/blocks/JoinSignupBlock";
import EmailSignupBlock from "@/components/blocks/EmailSignupBlock";
import ContactBodyBlock from "@/components/blocks/ContactBodyBlock";

export interface BoardMember {
  _id: string;
  name: string;
  role?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio: any[];
}

export interface AdvisoryMember {
  _id: string;
  name: string;
  note?: string;
}

export interface PageBuilderContext {
  boardMembers?: BoardMember[];
  advisoryMembers?: AdvisoryMember[];
  /** Which interior page — used by PageHeroBlock for default copy */
  page?: "about" | "how-it-works" | "join" | "contact";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PageBuilder({ blocks, context = {} }: { blocks: any[]; context?: PageBuilderContext }) {
  if (!blocks?.length) return null;

  const rendered: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const key = block._key ?? block._type + "-" + i;

    // Special case: landowner steps (list layout) immediately followed by volunteerSplit
    // → render both side-by-side in a single section (matching the how-it-works page layout)
    if (
      block._type === "block.stepCards" &&
      block.layout === "list" &&
      i + 1 < blocks.length &&
      blocks[i + 1]._type === "block.volunteerSplit"
    ) {
      const volunteerBlock = blocks[i + 1];
      const volunteerKey = volunteerBlock._key ?? volunteerBlock._type + "-" + (i + 1);
      rendered.push(
        <section
          key={key}
          className="py-[88px] px-8 md:px-16"
          style={{ backgroundColor: "var(--color-sand)" }}
        >
          <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 items-start">
            <LandownerStepsBlock
              key={key + "-landowner"}
              overline={block.overline}
              heading={block.heading}
              ctaLabel={block.ctaLabel}
              ctaHref={block.ctaHref}
              steps={block.steps}
            />
            <VolunteerSplitBlock
              key={volunteerKey}
              overline={volunteerBlock.overline}
              heading={volunteerBlock.heading}
              bodyParagraphs={volunteerBlock.bodyParagraphs}
              whatTheyDo={volunteerBlock.whatTheyDo}
              whatTheyGet={volunteerBlock.whatTheyGet}
              ctaLabel={volunteerBlock.ctaLabel}
              ctaHref={volunteerBlock.ctaHref}
            />
          </div>
        </section>
      );
      i += 2;
      continue;
    }

    switch (block._type) {
      case "block.hero":
        rendered.push(<HeroBlock key={key} {...block} />);
        break;

      case "block.pageHero":
        rendered.push(
          <PageHeroBlock key={key} {...block} page={context.page} />
        );
        break;

      case "block.textMedia":
        rendered.push(<TextMediaBlock key={key} {...block} />);
        break;

      case "block.stepCards":
        rendered.push(<StepCardsBlock key={key} {...block} />);
        break;

      case "block.principleCards":
        rendered.push(<PrincipleCardsBlock key={key} {...block} />);
        break;

      case "block.ctaStrip":
        rendered.push(<CTAStripBlock key={key} {...block} />);
        break;

      case "block.teamGrid":
        rendered.push(
          <TeamGridBlock key={key} {...block} boardMembers={context.boardMembers} />
        );
        break;

      case "block.advisoryList":
        rendered.push(
          <AdvisoryListBlock key={key} {...block} advisoryMembers={context.advisoryMembers} />
        );
        break;

      case "block.fiscalSponsor":
        rendered.push(<FiscalSponsorBlock key={key} {...block} />);
        break;

      case "block.volunteerSplit":
        // When volunteerSplit appears standalone (not paired with stepCards list), render as a full section
        rendered.push(
          <section
            key={key}
            className="py-[88px] px-8 md:px-16"
            style={{ backgroundColor: "var(--color-sand)" }}
          >
            <div className="mx-auto max-w-[1200px]">
              <VolunteerSplitBlock {...block} />
            </div>
          </section>
        );
        break;

      case "block.faqSection":
        rendered.push(<FAQSectionBlock key={key} {...block} />);
        break;

      case "block.joinSignup":
        rendered.push(<JoinSignupBlock key={key} {...block} />);
        break;

      case "block.emailSignup":
        rendered.push(<EmailSignupBlock key={key} {...block} />);
        break;

      case "block.contactBody":
        rendered.push(<ContactBodyBlock key={key} {...block} />);
        break;

      default:
        // Unknown block type — render nothing
        break;
    }

    i++;
  }

  return <>{rendered}</>;
}
