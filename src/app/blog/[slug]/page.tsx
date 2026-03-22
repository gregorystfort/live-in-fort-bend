import { client } from "@/sanity/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch(postSlugsQuery);
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug });
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.mainImage
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || "Blog image"}
          width={800}
          height={500}
          className="rounded-lg w-full"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-slate-muted mt-2 font-body">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-brand-sky hover:text-brand-navy underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-heading font-bold text-2xl text-charcoal mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-heading font-semibold text-xl text-charcoal mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-brand-sky pl-4 italic text-slate-muted my-6">
        {children}
      </blockquote>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) {
    return (
      <div className="container-blog py-24 text-center">
        <h1 className="font-heading font-bold text-3xl text-charcoal mb-4">
          Post Not Found
        </h1>
        <Link href="/" className="text-brand-sky hover:underline font-body">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article>
      <header className="bg-surface py-12">
        <div className="container-blog max-w-3xl">
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug.current}`}
              className="inline-block text-xs font-body font-medium uppercase tracking-wider text-brand-sky hover:text-brand-navy transition-colors mb-4"
            >
              {post.category.title}
            </Link>
          )}
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="font-body text-lg text-slate-muted mb-6">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 text-sm font-body text-slate-muted">
            {post.author?.image && (
              <Image
                src={urlFor(post.author.image).width(40).height(40).url()}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            {post.author && <span className="font-medium text-charcoal">{post.author.name}</span>}
            {formattedDate && (
              <>
                <span>·</span>
                <time>{formattedDate}</time>
              </>
            )}
          </div>
        </div>
      </header>

      {post.mainImage && (
        <div className="container-blog max-w-4xl -mt-0 mb-8">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mt-8">
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="container-blog max-w-3xl pb-16">
        <div className="prose prose-lg max-w-none font-body text-charcoal leading-relaxed">
          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/"
            className="text-brand-sky hover:text-brand-navy font-body font-medium transition-colors"
          >
            &larr; Back to all articles
          </Link>
        </div>
      </div>
    </article>
  );
}
