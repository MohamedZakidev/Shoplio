"use client"
import { Product } from '@/sanity.types'
import { useBasketStore } from '@/store/store'
import { useEffect, useState } from 'react'

type BasketButtonProps = {
    product: Product,
}

function BasketButton({ product }: BasketButtonProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore()
    const itemCount = getItemCount(product._id)
    const [isClient, setIsClient] = useState(false)
    const isOutOfStock = product.stock != null && product.stock <= 0

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    return (
        <div className='flex items-center justify-center space-x-2'>
            <button
                onClick={() => removeItem(product._id)}
                className={
                    `w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
                    ${itemCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}
                    `}
                disabled={itemCount === 0 || isOutOfStock}
            >
                <span className={`text-xl font-bold ${itemCount === 0 ? "text=gray-400" : "text-gray-600"}`}>
                    -
                </span>
            </button>
            <span className='w-8 text-center font-semibold'>{itemCount}</span>
            <button
                onClick={() => addItem(product)}
                className={
                    `text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
                    ${isOutOfStock ? "bg-gray-100 cursor-not-allowed" : "bg-primary-500 hover:opacity-75"}
                    `}
                disabled={isOutOfStock}
            >
                <span className="text-xl font-bold text-white">
                    +
                </span>
            </button>

        </div >
    )
}

export default BasketButton
