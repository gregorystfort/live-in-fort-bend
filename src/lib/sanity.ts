import { client } from "@/sanity/client";

export async function safeFetch<T>(query: string, params?: Record<string, any>): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params);
    return result;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [] as unknown as T;
  }
}
