import { getProductBySlug } from "@/sanity/lib/products/getProdductBySlug"
import { generateImageURL } from "@/sanity/lib/utilities/generateImageURL"
import { PortableText } from "next-sanity"
import Image from "next/image"
import { notFound } from "next/navigation"

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    const isOutOfStock = product.stock != null && product.stock <= 0

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}>
                    {product.image && (
                        <Image
                            className="object-contain transition-transform duration-300 hover:scale-105"
                            src={generateImageURL(product.image).url()}
                            alt={product.name || "Product Image"}
                            fill
                        />
                    )}
                    {isOutOfStock && (
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        >
                            <span className="text-white text-lg font-bold">Out of Stock</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl font-semibold mb-4">
                        £{product.price?.toFixed(2)}
                    </p>
                    <p className="prose max-w-none mb-6">
                        {Array.isArray(product.description) && (
                            <PortableText value={product.description} />
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
