import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getAllSales() {
    const ALL_SALES_QUERY = defineQuery(`
        *[_type == "sale"] | order(_createdAt desc)
    `)

    try {
        const sales = await sanityFetch({
            query: ALL_SALES_QUERY,
        })
        return sales.data || []
    } catch (error) {
        console.error("Error fetching all sales", error);
        return [];
    }
}