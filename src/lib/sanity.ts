import { client } from "@/sanity/client";

export async function safeFetch<T>(query: string, params?: Record<string, string>): Promise<T> {
  try {
    const result = params
      ? await client.fetch<T>(query, params)
      : await client.fetch<T>(query);
    return result;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [] as unknown as T;
  }
}
