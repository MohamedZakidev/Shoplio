"use client"
import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from 'motion/react';
import ProductThumbnail from "./ProductThumbnail";
type ProductsGridProps = {
    products: Product[];
}

function ProductsGrid({ products }: ProductsGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-col-6 gap-4 mt-4">
            {products.map(product => (
                <AnimatePresence key={product._id}>
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center"
                    >
                        <ProductThumbnail product={product} />
                    </motion.div>
                </AnimatePresence>
            ))}
        </div>
    )
}

export default ProductsGrid
