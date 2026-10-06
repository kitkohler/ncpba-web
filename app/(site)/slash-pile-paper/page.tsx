import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Overline from "@/components/Overline";
import SlashPilePaperOrderForm from "@/components/SlashPilePaperOrderForm";
import { PRICE_POINTS, estimatePricePerRoll, getTotalRollsOrdered } from "@/lib/slashPilePaper";

export const metadata: Metadata = {
  title: "Slash Pile Paper Group Order",
  description:
    "Join the NCPBA group order for 4′ × 300′ slash pile paper. The more rolls we order together, the less freight costs everyone.",
};
export const revalidate = 60;

const GOAL = PRICE_POINTS[PRICE_POINTS.length - 1];

export default async function SlashPilePaperPage() {
  const totalRolls = await getTotalRollsOrdered();

  return (
    <>
      <PageHero
        overline="Group order"
        headline="Slash pile paper, ordered together."
        subhead="We're pooling orders for 4′ × 300′ rolls of slash pile paper. Freight is the expensive part, so the more rolls we order as a group, the cheaper each roll gets for everyone."
      />

      <section className="py-[88px] px-8 md:px-16" style={{ backgroundColor: "var(--color-warm-cream)" }}>
        <div className="mx-auto max-w-[1000px] grid grid-cols-1 gap-16 md:grid-cols-[2fr_1.2fr] items-start">
          <div>
            <h2
              className="text-[28px] leading-snug mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
            >
              Add your order
            </h2>
            <p className="text-[14px] mb-8" style={{ color: "var(--color-smoke-dark)", fontFamily: "var(--font-body)" }}>
              No payment now. Your details stay private and are only used for this order.
            </p>
            <SlashPilePaperOrderForm totalRolls={totalRolls} />
          </div>

          <aside className="flex flex-col gap-7">
            {totalRolls !== null ? <OrderProgress totalRolls={totalRolls} /> : <PricePoints />}

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
    </>
  );
}

function OrderProgress({ totalRolls }: { totalRolls: number }) {
  const price = Math.round(estimatePricePerRoll(totalRolls));
  const toGoal = GOAL.rolls - totalRolls;
  const pct = Math.min(100, (totalRolls / GOAL.rolls) * 100);

  return (
    <div>
      <Overline color="var(--color-smoke-dark)" className="mb-4">
        Ordered so far
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
              est. per roll now
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
          {toGoal > 0
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
