import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY, PARTNERS_QUERY } from "@/sanity/lib/queries";
import PageBuilder from "@/components/PageBuilder";
import Overline from "@/components/Overline";

export const revalidate = 60;

export const metadata: Metadata = { title: "NCPBA — Nevada County Prescribed Burn Association" };

export default async function HomePage() {
  const [page, partners] = await Promise.all([
    client.fetch(HOME_QUERY).catch(() => null),
    client.fetch(PARTNERS_QUERY).catch(() => []),
  ]);

  const blocks = page?.pageBuilder ?? [];

  return (
    <>
      <PageBuilder blocks={blocks} />

      {/* Partners section — always shown below pageBuilder when data exists */}
      {partners?.length > 0 && (
        <section
          className="py-16 px-8 md:px-16"
          style={{ backgroundColor: "var(--color-sand)" }}
        >
          <div className="mx-auto max-w-[1200px]">
            <Overline color="var(--color-smoke)">Partners &amp; Affiliations</Overline>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {partners.map((p: { _id: string; name: string; href?: string }) => (
                <div
                  key={p._id}
                  className="rounded-[4px] px-[18px] py-2.5 text-[13px] font-medium"
                  style={{
                    backgroundColor: "white",
                    color: "var(--color-oak-bark)",
                    boxShadow: "var(--shadow-card)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {p.name}
                </div>
              ))}
            </div>
            <p
              className="text-[13px] leading-[1.65] max-w-[68ch]"
              style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
            >
              NCPBA is a fiscally sponsored project of the Nevada County Resource Conservation District, a trusted local conservation authority serving Nevada County since 1946.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
