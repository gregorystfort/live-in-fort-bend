import { client } from "@/sanity/client";
import { postsByCategoryQuery, categorySlugsQuery, categoriesQuery } from "@/sanity/queries";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch(categorySlugsQuery);
  return slugs.map((category: string) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const categories = await client.fetch(categoriesQuery);
  const category = categories.find(
    (c: any) => c.slug.current === params.category
  );
  const title = category?.title || params.category.replace(/-/g, " ");

  return {
    title: `${title} - Fort Bend County`,
    description: category?.description || `Explore ${title} in Fort Bend County, Texas.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [posts, categories] = await Promise.all([
    client.fetch(postsByCategoryQuery, { category: params.category }),
    client.fetch(categoriesQuery),
  ]);

  const currentCategory = categories.find(
    (c: any) => c.slug.current === params.category
  );
  const title = currentCategory?.title || params.category.replace(/-/g, " ");

  return (
    <>
      <section className="bg-surface py-12">
        <div className="container-blog">
          <Link
            href="/"
            className="text-brand-sky hover:text-brand-navy font-body text-sm font-medium transition-colors"
          >
            &larr; All Articles
          </Link>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-charcoal mt-4 mb-2 capitalize">
            {title}
          </h1>
          {currentCategory?.description && (
            <p className="font-body text-lg text-slate-muted max-w-2xl">
              {currentCategory.description}
            </p>
          )}
        </div>
      </section>

      <section className="container-blog py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/blog/category/${cat.slug.current}`}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-colors ${
                cat.slug.current === params.category
                  ? "bg-brand-sky text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-brand-sky hover:text-brand-sky"
              }`}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="container-blog pb-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface rounded-xl">
            <p className="font-heading font-semibold text-xl text-charcoal mb-2">
              No articles yet
            </p>
            <p className="font-body text-slate-muted">
              We're working on {title.toLowerCase()} content for Fort Bend
              County. Check back soon!
            </p>
          </div>
        )}
      </section>
    </>
  );
}
