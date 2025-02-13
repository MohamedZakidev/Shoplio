import CategoriesView from "@/components/CategoriesView"
import ProductsGrid from "@/components/ProductsGrid"
import { searchProductByName } from "@/sanity/lib/products/searchProductByName"
import { searchParamsProps } from "@/types"

async function SearchPage({ searchParams }: searchParamsProps) {
    const { query } = (await searchParams)
    const searchedProducts = await searchProductByName(query)

    if (searchedProducts.length === 0) {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        No products found for : {query}
                    </h1>
                    <p className="text-gray-600 text-center">
                        Try searching with different keywords
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Search results for : {query}
                </h1>
                <CategoriesView />
                <ProductsGrid products={searchedProducts} />
            </div>
        </div>
    )
}

export default SearchPage
