import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export async function searchProductByName(searchParam: string | string[] | undefined) {
    const SEARCHED_PRODUCTS_QUERY = defineQuery(`
        *[
            _type == "product"
            && name match $searchParam
            ] | order(name asc)
        `)
    try {
        const searchedProducts = await sanityFetch({
            query: SEARCHED_PRODUCTS_QUERY,
            params: { searchParam: `${searchParam}*` }
        })
        return searchedProducts.data || []
    } catch (error) {
        console.error("Error fetching searched products", error)
        return []
    }
}