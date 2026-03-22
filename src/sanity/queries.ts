import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "category": category->{ title, slug },
    "author": author->{ name, image }
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "category": category->{ title, slug },
    "author": author->{ name, image }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    excerpt,
    publishedAt,
    mainImage,
    seoTitle,
    seoDescription,
    "category": category->{ title, slug },
    "author": author->{ name, image, bio }
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "category": category->{ title, slug },
    "author": author->{ name, image }
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const categorySlugsQuery = groq`
  *[_type == "category" && defined(slug.current)][].slug.current
`;
