import { Metadata } from "@/lib/actions/stripe";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
        return NextResponse.json({ error: "No signature provided" }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
        return NextResponse.json({ error: "No webhook secret provided" }, { status: 400 })
    }

    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error) {
        return NextResponse.json({ error: `Webhook Error: ${error}` }, { status: 400 })
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session
        try {
            const order = await createOrderSanity(session)
            console.log("order created in sanity", order)
        } catch (error) {
            console.log("error creating order in sanity", error)
            return NextResponse.json({ error: `Error creating order in sanity: ${error}` }, { status: 500 })
        }
    }
    return NextResponse.json({ received: true }, { status: 200 })
}

async function createOrderSanity(session: Stripe.Checkout.Session) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details,
    } = session
    const {
        orderNumber,
        clerkUserId,
        customerName,
        customerEmail } =
        metadata as Metadata

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        { expand: ["data.price.product"] })

    const sanityProducts = lineItemsWithProduct.data.map(item => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0,
    }))
    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName: customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency: currency,
        amountDiscount: total_details?.amount_discount ?
            total_details.amount_discount / 100 : 0,
        products: sanityProducts,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toString(),
    })
    return order
}

// export async function POST(req: NextRequest) {
//     console.log("Webhook request received"); // Log when the function runs
//     const body = await req.text();
//     console.log("Raw body:", body); // Log raw request body
//     const headersList = await headers()

//     // const headersList = req.headers; // Use req.headers instead of headers()
//     console.log("Headers received:", Object.fromEntries(headersList.entries())); // Log all headers

//     // Get Stripe signature
//     const signature = headersList.get("stripe-signature");
//     console.log("Stripe Signature:", signature); // Log Stripe signature

//     return new Response("OK", { status: 200 });
// }

