import JoinPathCards from "@/components/JoinPathCards";

interface Props {
  heading?: string;
  body?: string;
}

export default function JoinSignupBlock(_props: Props) {
  // JoinPathCards renders its own heading/body/CTA; props reserved for future override
  return (
    <section
      className="py-[96px] px-8 md:px-16"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      <div className="mx-auto max-w-[940px]">
        <JoinPathCards />
      </div>
    </section>
  );
}
