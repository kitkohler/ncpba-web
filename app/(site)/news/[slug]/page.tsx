import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { NEWS_POST_QUERY, NEWS_POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

const CATEGORY_LABELS: Record<string, string> = {
  "burn-updates":    "Burn Updates",
  community:         "Community",
  "policy-advocacy": "Policy & Advocacy",
  press:             "Press",
};

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(NEWS_POST_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await client.fetch(NEWS_POST_QUERY, { slug: params.slug });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.coverImage?.asset?.url
      ? { images: [{ url: urlFor(post.coverImage).width(1200).height(630).url() }] }
      : undefined,
  };
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(NEWS_POST_QUERY, { slug: params.slug });
  if (!post) notFound();

  const coverUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(600).url()
    : null;

  return (
    <>
      {coverUrl && (
        <div className="relative w-full overflow-hidden" style={{ height: 400 }}>
          <Image
            src={coverUrl}
            alt={post.coverImage?.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(44,36,22,0.40)" }}
          />
        </div>
      )}

      <article
        className="mx-auto max-w-[720px] px-8 py-16"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Link
            href="/news"
            className="text-[13px] no-underline hover:underline"
            style={{ color: "var(--color-smoke)", fontFamily: "var(--font-body)" }}
          >
            ← News
          </Link>
          <span style={{ color: "var(--color-smoke)" }}>·</span>
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

        <h1
          className="text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.025em] mb-6"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-deep-soil)" }}
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p
            className="text-[18px] leading-[1.70] mb-10 pl-4"
            style={{
              color: "var(--color-oak-bark)",
              fontFamily: "var(--font-body)",
              borderLeft: "4px solid var(--color-ember)",
              maxWidth: "none",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {post.body && (
          <div
            className="prose-ncpba"
            style={{
              "--prose-body": "var(--color-deep-soil)",
              fontFamily: "var(--font-body)",
            } as React.CSSProperties}
          >
            <PortableText value={post.body} />
          </div>
        )}
      </article>
    </>
  );
}
