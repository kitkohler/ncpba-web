import Overline from "@/components/Overline";
import Accordion from "@/components/Accordion";

interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
}

interface Props {
  overline?: string;
  heading?: string;
  faqItems?: FaqItem[];
}

const COPY_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do I need to own land to get involved?",
    answer: "No. Volunteers don't need to be landowners. If you want to help support burns and build fire skills in Nevada County, there's a place for you.",
  },
  {
    question: "What permits do I need to burn?",
    answer: "It depends on the time of year, your location, and the size of your burn. CAL FIRE issues burn permits for most open burning in Nevada County. NCPBA can help you understand what's required for your specific situation.",
  },
  {
    question: "Is prescribed burning legal in California?",
    answer: "Yes. Prescribed burning with proper permits is legal in California and actively encouraged by CAL FIRE and state agencies as a fire risk reduction strategy.",
  },
  {
    question: "When is burn season in Nevada County?",
    answer: "Prescribed burning in Nevada County happens year-round with the right permits. CAL FIRE requires burn permits for open burning, and permit conditions vary by season. The primary window when conditions are most favorable tends to be fall through early spring. Around May 1 CAL FIRE typically shifts to more restrictive permit conditions as fire danger increases heading into summer. Fall reopening is variable, usually somewhere between mid-October and late November depending on conditions that year.",
  },
  {
    question: "What does it cost to work with NCPBA?",
    answer: "There is no fee for landowner participation. NCPBA operates on a mutual aid model. Your contribution is showing up for neighbors when they burn.",
  },
];

export default function FAQSectionBlock(props: Props) {
  const overline = props.overline ?? "Common Questions";
  const heading = props.heading ?? "Frequently asked.";
  const items = props.faqItems?.length ? props.faqItems : COPY_FAQ_ITEMS;

  return (
    <section
      className="py-[88px] px-8 md:px-16"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      <div className="mx-auto max-w-[780px]">
        <Overline color="var(--color-sage)">{overline}</Overline>
        <h2
          className="text-[26px] md:text-[34px] leading-[1.1] mb-10"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
        >
          {heading}
        </h2>
        <Accordion items={items} />
      </div>
    </section>
  );
}
