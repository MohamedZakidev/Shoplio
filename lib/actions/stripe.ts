"use server"

import { generateImageURL } from "@/sanity/lib/utilities/generateImageURL"
import { BasketItem } from "@/store/store"
import stripe from "../stripe"

export type Metadata = {
    orderNumber: string,
    customerName: string,
    customerEmail: string,
    clerkUserId: string
}

export type GroupedBasketItem = {
    product: BasketItem["product"], //extracts the type of the product property from BasketItem equals to type Product
    quantity: number
}

export async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {
    try {
        // check if some items does not have a price
        const itemsWithoutPrice = items.filter(item => !item.product.price)
        if (itemsWithoutPrice.length > 0) {
            throw new Error("some items do not have a price")
        }

        // check for existing customer by email
        const customer = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1
        })

        let customerId: string | undefined
        if (customer.data.length > 0) {
            customerId = customer.data[0].id
        }

        const baseUrl = process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_BASE_URL
        const success_url = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&order_number=${metadata.orderNumber}`
        const cancel_url = `${baseUrl}/basket`

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata: metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: success_url,
            cancel_url: cancel_url,
            line_items: items.map(item => (
                {
                    price_data: {
                        currency: "eur",
                        unit_amount: Math.round(item.product.price! * 100),
                        product_data: {
                            name: item.product.name || "Unnamed Product",
                            description: `Product ID: ${item.product._id}`,
                            metadata: {
                                id: item.product._id,
                            },
                            images: item.product.image ?
                                [generateImageURL(item.product.image).url()] : undefined,
                        },
                    },
                    quantity: item.quantity,
                }))
        })
        return session.url
    } catch (error) {
        console.error("Error creating checkout session", error)
    }
}