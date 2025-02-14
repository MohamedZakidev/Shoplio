import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getProductBySlug(slug: string) {
    const PRODUCT_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug] | order(name asc) [0]
    `)

    try {
        const product = await sanityFetch({
            query: PRODUCT_QUERY,
            params: { slug }
        })
        return product.data || null
    } catch (error) {
        console.error("Error fetching product", error)
        return null
    }
}