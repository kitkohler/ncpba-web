import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { NEWS_INDEX_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "News" };
export const revalidate = 0;

const CATEGORY_LABELS: Record<string, string> = {
  "burn-updates":    "Burn Updates",
  community:         "Community",
  "policy-advocacy": "Policy & Advocacy",
  press:             "Press",
};

export default async function NewsPage() {
  const posts: any[] = await client.fetch(NEWS_INDEX_QUERY).catch(() => []);

  return (
    <>
      <PageHero
        overline="From the Field"
        headline="News"
        subhead="Updates from NCPBA burns, volunteer stories, and fire stewardship in the Sierra Nevada foothills."
      />

      <section
        className="py-16 md:py-20 px-8 md:px-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          {posts.length === 0 ? (
            <div className="py-24 text-center">
              <p
                className="text-[15px]"
                style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
              >
                No articles yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post._id} className="flex flex-col gap-4">
                  {post.coverImage?.asset?.url && (
                    <Link href={`/news/${post.slug.current}`} className="no-underline block">
                      <div className="rounded-[6px] overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        <Image
                          src={urlFor(post.coverImage).width(600).height(338).url()}
                          alt={post.coverImage.alt ?? post.title}
                          width={600}
                          height={338}
                          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-bold tracking-[0.07em] uppercase"
                      style={{ color: "var(--color-ember)", fontFamily: "var(--font-body)" }}
                    >
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                    <span
                      className="text-[12px]"
                      style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <Link href={`/news/${post.slug.current}`} className="no-underline">
                    <h2
                      className="text-[21px] leading-snug hover:text-ember transition-colors"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
                    >
                      {post.title}
                    </h2>
                  </Link>
                  <p
                    className="text-[14px] leading-[1.70]"
                    style={{ color: "var(--color-oak-bark)", fontFamily: "var(--font-body)", maxWidth: "none" }}
                  >
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/news/${post.slug.current}`}
                    className="text-[13px] font-semibold no-underline"
                    style={{ color: "var(--color-ember)", fontFamily: "var(--font-body)" }}
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
