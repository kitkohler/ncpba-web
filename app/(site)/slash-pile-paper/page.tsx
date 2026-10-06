import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Overline from "@/components/Overline";
import SlashPilePaperOrderForm from "@/components/SlashPilePaperOrderForm";
import {
  DEADLINE_LABEL,
  PRICE_POINTS,
  estimatePricePerRoll,
  getTotalRollsOrdered,
  ordersOpen,
} from "@/lib/slashPilePaper";

export const metadata: Metadata = {
  title: "Slash Pile Paper Group Order",
  description:
    "Join the NCPBA group order for 4′ × 300′ slash pile paper. The more rolls we order together, the less freight costs everyone.",
};
export const revalidate = 60;

const GOAL = PRICE_POINTS[PRICE_POINTS.length - 1];

export default async function SlashPilePaperPage() {
  const totalRolls = await getTotalRollsOrdered();
  const open = ordersOpen();

  return (
    <>
      <PageHero
        overline="Group order"
        headline="Slash pile paper, ordered together."
        subhead="We're pooling orders for 4′ × 300′ rolls of slash pile paper. Freight is the expensive part, so the more rolls we order as a group, the cheaper each roll gets for everyone."
      >
        <p
          className="inline-block mt-7 rounded-[4px] px-4 py-2 text-[15px] font-semibold"
          style={{ backgroundColor: "rgba(237,229,212,0.10)", color: "var(--color-warm-cream)", fontFamily: "var(--font-body)" }}
        >
          {open ? `Orders close ${DEADLINE_LABEL}` : `Orders closed ${DEADLINE_LABEL}`}
        </p>
        <br />
        <a
          href="#about"
          className="inline-block mt-4 text-[15px] font-semibold no-underline hover:underline"
          style={{ color: "var(--color-ember-light)", fontFamily: "var(--font-body)" }}
        >
          About slash pile paper ↓
        </a>
      </PageHero>

      <section id="order" className="py-[88px] px-8 md:px-16 scroll-mt-20" style={{ backgroundColor: "var(--color-warm-cream)" }}>
        <div className="mx-auto max-w-[1000px] grid grid-cols-1 gap-16 md:grid-cols-[2fr_1.2fr] items-start">
          <div>
            <h2
              className="text-[28px] leading-snug mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              {open ? "Add your order" : "Orders are closed"}
            </h2>
            {open ? (
              <>
                <p className="text-[14px] mb-8" style={{ color: "var(--color-smoke-dark)", fontFamily: "var(--font-body)" }}>
                  <strong style={{ color: "var(--color-deep-soil)" }}>Orders close {DEADLINE_LABEL}.</strong> No payment
                  now. Your details stay private and are only used for this order.
                </p>
                <SlashPilePaperOrderForm totalRolls={totalRolls} />
              </>
            ) : (
              <p className="text-[15px] leading-[1.7]" style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}>
                This group order closed on {DEADLINE_LABEL}. If you ordered, we&rsquo;ll be in touch by email with the
                final price, payment, and pickup details.
              </p>
            )}
          </div>

          <aside className="flex flex-col gap-7">
            {totalRolls !== null ? <OrderProgress totalRolls={totalRolls} open={open} /> : <PricePoints />}

            <div>
              <Overline color="var(--color-smoke-dark)" className="mb-3">
                What happens next
              </Overline>
              <p className="text-[14px] leading-[1.7]" style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}>
                Once orders are in, we&rsquo;ll email everyone with the final price per roll, how to pay, and where to
                pick up. Share this page with neighbors — every roll helps.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <AboutPilePaper open={open} />
    </>
  );
}

const BENEFITS = [
  {
    title: "Burn when it’s safe",
    body: "The safest time to burn piles is after the rains, when the ground and everything around the pile is wet. A covered pile stays dry inside, so it will actually light then.",
  },
  {
    title: "Less smoke",
    body: "Dry fuel burns hot and fast. A wet pile smolders for days and puts out far more smoke for you and your neighbors.",
  },
  {
    title: "Burns with the pile",
    body: "Plastic tarps have to come off before you light, because burning plastic isn’t allowed. Paper goes up with the pile, so there’s nothing to pull off a soggy pile and nothing left behind.",
  },
];

function AboutPilePaper({ open }: { open: boolean }) {
  return (
    <section id="about" className="py-[88px] px-8 md:px-16 scroll-mt-20" style={{ backgroundColor: "var(--color-sand)" }}>
      <div className="mx-auto max-w-[1000px]">
        <Overline className="mb-4">Why paper?</Overline>
        <h2
          className="text-[32px] md:text-[38px] leading-[1.15] tracking-[-0.015em] mb-5 max-w-[22ch]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
        >
          Keep your piles dry. Burn them clean.
        </h2>
        <p
          className="text-[17px] leading-[1.7] max-w-[62ch] mb-12"
          style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
        >
          Slash pile paper is heavy, wax-coated paper made for covering brush and slash piles. Lay a sheet over the top
          of a pile before the rains come and it keeps the center dry through the wet season, so when it&rsquo;s time to
          burn, the pile lights easily and burns cleanly.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mb-12">
          {BENEFITS.map(({ title, body }) => (
            <div key={title} className="rounded-[6px] p-6" style={{ backgroundColor: "white" }}>
              <h3
                className="text-[20px] leading-snug mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
              >
                {title}
              </h3>
              <p className="text-[14px] leading-[1.7]" style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-[62ch]">
          <h3
            className="text-[20px] leading-snug mb-3"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
          >
            How to use it
          </h3>
          <ul
            className="flex flex-col gap-2 text-[15px] leading-[1.7] list-disc pl-5"
            style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)" }}
          >
            <li>Build piles compact and tight, with the small, fine material near the center.</li>
            <li>Cover the top of the pile before the first big rain. It doesn&rsquo;t need to reach the ground, just shed water off the core.</li>
            <li>Weigh the paper down with a few heavy branches so wind can&rsquo;t lift it.</li>
            <li>One 4′ × 300′ roll covers a lot of piles, so it&rsquo;s easy to split with a neighbor.</li>
            <li>When you burn, make sure it&rsquo;s a permissible burn day and follow your burn permit.</li>
          </ul>

          {open && (
            <a
              href="#order"
              className="inline-flex items-center justify-center mt-10 px-7 py-3 text-[15px] font-semibold rounded-[4px] text-white no-underline transition-all duration-[180ms] hover:brightness-90"
              style={{ backgroundColor: "var(--color-ember)", fontFamily: "var(--font-body)" }}
            >
              Place your order ↑
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function OrderProgress({ totalRolls, open }: { totalRolls: number; open: boolean }) {
  const price = Math.round(estimatePricePerRoll(totalRolls));
  const toGoal = GOAL.rolls - totalRolls;
  const pct = Math.min(100, (totalRolls / GOAL.rolls) * 100);

  return (
    <div>
      <Overline color="var(--color-smoke-dark)" className="mb-4">
        {open ? "Ordered so far" : "Total ordered"}
      </Overline>
      <div className="rounded-[6px] px-5 py-5" style={{ backgroundColor: "white", fontFamily: "var(--font-body)" }}>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[36px] leading-none" style={{ fontFamily: "var(--font-display)", color: "var(--color-deep-soil)" }}>
            {totalRolls}
            <span className="text-[14px] ml-1.5" style={{ fontFamily: "var(--font-body)", color: "var(--color-oak-bark)" }}>
              rolls
            </span>
          </span>
          <span className="text-right">
            <span className="block text-[22px] leading-none" style={{ fontFamily: "var(--font-display)", color: "var(--color-ember)" }}>
              ~${price}
            </span>
            <span className="text-[12px]" style={{ color: "var(--color-smoke-dark)" }}>
              {open ? "est. per roll now" : "est. per roll"}
            </span>
          </span>
        </div>

        <div
          className="h-2 rounded-full mt-5 overflow-hidden"
          style={{ backgroundColor: "var(--color-warm-cream)" }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={GOAL.rolls}
          aria-valuenow={totalRolls}
          aria-label={`${totalRolls} of ${GOAL.rolls} rolls`}
        >
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "var(--color-ember)" }} />
        </div>
        <p className="text-[13px] mt-2.5" style={{ color: "var(--color-oak-bark)" }}>
          {!open
            ? "Final numbers will come by email."
            : toGoal > 0
            ? `${toGoal} more rolls gets everyone down to about $${GOAL.price} a roll.`
            : `We've passed ${GOAL.rolls} rolls — about $${Math.round(estimatePricePerRoll(totalRolls))} a roll and still dropping.`}
        </p>
      </div>
      <p className="text-[12px] leading-[1.6] mt-3" style={{ color: "var(--color-smoke-dark)", fontFamily: "var(--font-body)" }}>
        Estimates based on the supplier&rsquo;s rough quotes ({PRICE_POINTS.map((p) => `~$${p.price} at ${p.rolls} rolls`).join(", ")}).
        Final price depends on the total order.
      </p>
    </div>
  );
}

function PricePoints() {
  return (
    <div>
      <Overline color="var(--color-smoke-dark)" className="mb-4">
        More orders, lower price
      </Overline>
      <div className="flex flex-col gap-3">
        {PRICE_POINTS.map(({ rolls, price }) => (
          <div
            key={rolls}
            className="flex items-baseline justify-between rounded-[6px] px-5 py-4"
            style={{ backgroundColor: "white", fontFamily: "var(--font-body)" }}
          >
            <span className="text-[14px]" style={{ color: "var(--color-oak-bark)" }}>
              {rolls} rolls ordered
            </span>
            <span className="text-[22px]" style={{ fontFamily: "var(--font-display)", color: "var(--color-deep-soil)" }}>
              ~${price}
              <span className="text-[13px] ml-1" style={{ fontFamily: "var(--font-body)", color: "var(--color-smoke-dark)" }}>
                / roll
              </span>
            </span>
          </div>
        ))}
      </div>
      <p className="text-[13px] leading-[1.6] mt-3" style={{ color: "var(--color-smoke-dark)", fontFamily: "var(--font-body)" }}>
        Rough estimates from the supplier. Final price depends on the total order.
      </p>
    </div>
  );
}
