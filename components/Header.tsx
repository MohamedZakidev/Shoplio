"use client"
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { PackageIcon, TrolleyIcon } from "@sanity/icons"
import Form from "next/form"
import Link from "next/link"

function Header() {
    const { user } = useUser()

    // async function createClerkPassKey() {
    //     try {
    //         const response = await user?.createPasskey()
    //         console.log(response)
    //     } catch (error) {
    //         console.error("Errors:", JSON.stringify(error, null, 2))
    //     }
    // }

    return (
        <header className="flex flex-wrap justify-between items-center px-4 py-2">
            {/* top row */}
            <Link href={"/"}
                className="text-2xl font-bold text-primary-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0 capitalize"
            >
                shoplio
            </Link>
            <Form
                action={"/search"}
                className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
            >
                <input
                    name="query"
                    type="search"
                    placeholder="Search for products"
                    className="w-full max-w-4xlbg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 border"
                />
            </Form>
            <div className="flex flex-wrap gap-2 justify-center mt-4 sm:mt-0 borde w-full sm:w-auto">
                <Link href={"/basket"}
                    className="primary-btn text-xs sm:text-base"
                >
                    <TrolleyIcon className="w-6 h-6" />
                    {/* span item count */}
                    <span>my basket</span>
                </Link>

                {/* user area */}
                <ClerkLoaded>
                    {user && (
                        <Link href={"/orders"}
                            className="primary-btn text-xs sm:text-base"
                        >
                            <PackageIcon className="w-6 h-6" />
                            <span>my orders</span>
                        </Link>
                    )}
                </ClerkLoaded>
                <ClerkLoaded>

                    {user ? (
                        <div className="flex items-center space-x-2">
                            <UserButton />
                            <div className="hidden sm:block text-xs">
                                <p className="capitalize text-gray-400">welcome back</p>
                                <p className="font-bold">{user.fullName}!</p>
                            </div>
                        </div>
                    ) :
                        <SignInButton
                            mode="modal"
                        >
                            <button className="font-bold text-gray-700">Sign in</button>
                        </SignInButton>
                    }
                </ClerkLoaded>

                {/* <div className="hidden md:block">
                    <ClerkLoaded>
                        {user?.passkeys.length === 0 && (
                            <button
                                onClick={createClerkPassKey}
                                className="capitalize bg-white hover:bg-primary-500 text-primary-500 hover:text-white animate-pulse font-bold py-2 px-4 rounded border-primary-500"
                            >
                                Create Passkey
                            </button>
                        )}
                    </ClerkLoaded>
                </div> */}
            </div>
        </header>
    )
}

export default Header
