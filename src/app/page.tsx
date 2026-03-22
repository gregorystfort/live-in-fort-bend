import { safeFetch } from "@/lib/sanity";
import { postsQuery, featuredPostsQuery, categoriesQuery } from "@/sanity/queries";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    safeFetch<any[]>(postsQuery),
    safeFetch<any[]>(featuredPostsQuery),
    safeFetch<any[]>(categoriesQuery),
  ]);

  const hasFeatured = featuredPosts.length > 0;
  const displayPosts = hasFeatured ? posts.filter(
    (p: any) => !featuredPosts.some((f: any) => f._id === p._id)
  ) : posts;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white py-16 md:py-24">
        <div className="container-blog text-center">
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-4">
            Your Guide to{" "}
            <span className="text-brand-sky">Fort Bend County</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-slate-muted max-w-2xl mx-auto">
            Neighborhoods, schools, dining, events, real estate insights, and
            everything that makes Fort Bend home.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      {categories.length > 0 && (
        <section className="container-blog -mt-6 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/blog/category/${cat.slug.current}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-body font-medium text-gray-600 hover:border-brand-sky hover:text-brand-sky transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Posts */}
      {hasFeatured && (
        <section className="container-blog mb-16">
          <h2 className="font-heading font-bold text-2xl text-charcoal mb-6">
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post: any, i: number) => (
              <PostCard key={post._id} post={post} featured={i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="container-blog mb-16">
        <h2 className="font-heading font-bold text-2xl text-charcoal mb-6">
          {hasFeatured ? "Latest Articles" : "Articles"}
        </h2>
        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface rounded-xl">
            <p className="font-heading font-semibold text-xl text-charcoal mb-2">
              Coming Soon
            </p>
            <p className="font-body text-slate-muted">
              We&apos;re working on amazing content about Fort Bend County.
              Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-brand-navy py-16">
        <div className="container-blog text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
            Stay in the Know
          </h2>
          <p className="font-body text-blue-200 mb-6 max-w-lg mx-auto">
            Get the latest Fort Bend news, events, and real estate insights
            delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 rounded-lg font-body text-sm border-0 focus:ring-2 focus:ring-brand-sky"
            />
            <button className="px-6 py-3 bg-brand-sky text-white font-body font-medium text-sm rounded-lg hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
