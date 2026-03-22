import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    publishedAt?: string;
    mainImage?: any;
    category?: { title: string; slug: { current: string } };
    author?: { name: string; image?: any };
  };
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article
      className={`group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
    >
      {post.mainImage && (
        <Link href={`/blog/${post.slug.current}`} className="block overflow-hidden">
          <div
            className={`relative ${
              featured ? "h-64 md:h-full" : "h-48"
            } bg-surface`}
          >
            <Image
              src={urlFor(post.mainImage).width(800).height(500).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
      )}

      <div className={`p-5 ${featured ? "flex flex-col justify-center" : ""}`}>
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug.current}`}
            className="inline-block text-xs font-body font-medium uppercase tracking-wider text-brand-sky hover:text-brand-navy transition-colors mb-2"
          >
            {post.category.title}
          </Link>
        )}

        <Link href={`/blog/${post.slug.current}`}>
          <h3
            className={`font-heading font-bold text-charcoal group-hover:text-brand-sky transition-colors leading-tight ${
              featured ? "text-2xl mb-3" : "text-lg mb-2"
            }`}
          >
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p
            className={`font-body text-slate-muted leading-relaxed ${
              featured ? "text-base mb-4" : "text-sm mb-3 line-clamp-2"
            }`}
          >
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs font-body text-slate-muted">
          {post.author && <span>{post.author.name}</span>}
          {post.author && formattedDate && <span>-</span>}
          {formattedDate && <time>{formattedDate}</time>}
        </div>
      </div>
    </article>
  );
}
