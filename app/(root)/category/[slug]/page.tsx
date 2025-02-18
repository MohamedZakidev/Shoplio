import CategoriesView from "@/components/CategoriesView"
import ProductsView from "@/components/ProductsView"
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories"
import { getCategoryBySlug } from "@/sanity/lib/categories/getCategoryBySlug"
import Link from "next/link"

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const products = await getCategoryBySlug(slug)
    const categories = await getAllCategories()

    if (!products?.length) {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
                <div className="flex flex-col items-center gap-2 bg-white rounded-lg p-8 shadow-md w-full max-w-4xl">
                    <h1 className="uppercase text-3xl font-bold text-center">
                        No products found for this category
                    </h1>
                    <Link
                        href="/"
                        className="text-primary-500 hover:underline"
                    >
                        Go back to home
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {slug.split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}{' '}Collection
                </h1>
                <CategoriesView categories={categories} />
                <ProductsView products={products} />
            </div>
        </div>
    )
}

export default page
