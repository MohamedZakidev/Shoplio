import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getCategoryBySlug(slug: string) {
    const CATEGORY_BY_SLUG_QUERY = defineQuery(`
    *[_type == "product"
        && references(*[_type == "category" && slug.current == $slug]._id)
    ] | order(name asc)
    `)

    try {
        const category = await sanityFetch({
            query: CATEGORY_BY_SLUG_QUERY,
            params: { slug }
        })
        return category.data || null
    } catch (error) {
        console.error("Error fetching category by slug", error)
        return null
    }
}