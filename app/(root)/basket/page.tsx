"use client"

import BasketButton from "@/components/BasketButton";
import Loader from "@/components/Loader";
import { generateImageURL } from "@/sanity/lib/utilities/generateImageURL";
import { useBasketStore } from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type Metadata = {
    orderNumber: string,
    customerName: string,
    customerEmail: string,
    clerkUserId: string
}

function BasketPage() {
    const groupedItems = useBasketStore(state => state.getGroupedItems())
    const totalPrice = useBasketStore(state => state.getTotalPrice())
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const router = useRouter()

    const [isClient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // wait for client to mount
    useEffect(() => {
        setIsClient(true)
    }, [])
    if (!isClient) {
        return <Loader />
    }

    async function handleCheckout() {
        if (!isSignedIn) return
        try {
            setIsLoading(true)
            const metadata: Metadata = {
                orderNumber: crypto.randomUUID(),
                clerkUserId: user!.id,
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown"
            }
            const checkoutUrl = await createCheckoutSession()
            if (checkoutUrl) {
                router.push(checkoutUrl)
                // window.location.href = checkoutUrl
            }
        }
        catch (error) {
            console.error("Error creating checkout session:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Your <span className="text-primary-500">Basket</span> is Empty
                </h1>
                <p className="text-center text-gray-600 text-lg mx-auto w-10/12 max-w-[600px]">Looks like there’s nothing in your basket yet! Start exploring our products and add your favorites to your cart. Don&apos;t miss out on amazing deals! 🚀</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-2xl font-bold mb-4 capitalize">your basket</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow flex flex-col gap-5"
                >
                    {groupedItems.map(item => (
                        <div
                            key={item.product._id}
                            className="p-4 border rounded flex items-center justify-between"
                        >
                            <div
                                className="flex items-center cursor-pointer flex-1 min-w-0"
                                onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                                    {item.product.image && (
                                        <Image
                                            src={generateImageURL(item.product.image).url()}
                                            alt={item.product.name ?? "Product image"}
                                            className="w-full h-full object-cover rounded"
                                            width={96}
                                            height={96}
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg sm:text-xl font-semibold truncate">{item.product.name}</h2>
                                    <p className="text-sm sm:text-base">
                                        Price: £
                                        {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <BasketButton product={item.product} />
                        </div>
                    ))}
                </div>
                <div className="w-full lg:w-80 p-6 border fixed lg:static bottom-0 left-0 lg:flex lg:flex-col justify-between">
                    <h3 className="text-xl font-bold capitalize">order summary</h3>
                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span className="capitalize">Items:</span>
                            <span>
                                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </p>
                        <p className="flex justify-between text-2xl font-bold border-t pt-2">
                            <span>Total:</span>
                            <span>
                                £{totalPrice.toFixed(2)}
                            </span>
                        </p>
                    </div>
                    {isSignedIn ? (
                        <button
                            className="mt-4 w-full bg-primary-500 text-white px-4 py-2 rounded hover:opacity-80 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            onClick={handleCheckout}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing" : "Checkout"}
                        </button>
                    ) : (
                        <SignInButton mode="modal">
                            <button
                                className="mt-4 w-full bg-primary-500 text-white px-4 py-3 rounded hover:opacity-80"
                            >
                                Sign in to Checkout
                            </button>
                        </SignInButton>
                    )}
                </div>
                {/* <div className="h-64 lg:h-0"> */}
                {/* space to make the user scroll on mobile */}
                {/* </div> */}
            </div>
        </div>
    )
}

export default BasketPage
