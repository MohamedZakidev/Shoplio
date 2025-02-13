import { CouponCode } from "@/types";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getActiveSaleByCouponCode(couponCode: CouponCode) {
    const ACTIVE_SALE_BY_COUPONCODE_QUERY = defineQuery(`
        *[_type == "sale" && 
            isActive == true 
            && couponCode == $couponCode
        ] | order(validFrom desc)[0]
    `)

    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPONCODE_QUERY,
            params: { couponCode }
        })
        return activeSale.data || null
    } catch (error) {
        console.error("Error fetching all sales", error);
    }
}