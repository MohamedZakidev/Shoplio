import { Product } from '@/sanity.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BasketItem = {
    product: Product
    quantity: number
}

type BasketState = {
    items: BasketItem[],
    addItem: (product: Product) => void,
    removeItem: (productId: string) => void,
    clearBasket: () => void,
    getTotalPrice: () => number,
    getItemCount: (productId: string) => number,
    getGroupedItems: () => BasketItem[]
}



export const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => set((state) => {
                const existedItem = state.items.find((item) => item.product._id === product._id)
                if (existedItem) {
                    return {
                        items: state.items.map(item => (
                            item.product._id === product._id ?
                                { ...item, quantity: item.quantity + 1 } : item
                        ))
                    }
                } else {
                    return {
                        items: [...state.items, { product: product, quantity: 1 }]
                    }
                }
            }),
            removeItem: (productId: string) => set((state) => {
                const existedItem = state.items.find((item) => item.product._id === productId)
                if (existedItem?.quantity === 1) {
                    existedItem.quantity--
                    return {
                        items: state.items.filter(item => item.product._id !== productId)
                    }
                } else {
                    return {
                        items: state.items.map(item => (
                            item.product._id === productId ?
                                { ...item, quantity: item.quantity - 1 } : item
                        ))
                    }
                }
            }),
            clearBasket: () => set({ items: [] }),
            getTotalPrice: () => {
                const totalPrice = get().items.reduce((acc, curr) => {
                    const price = curr.product.price ?? 0; // Use 0 if price is undefined
                    return acc + (price * curr.quantity);
                }, 0);
                return totalPrice;
            },
            getItemCount: (productId: string) => {
                const existedItem = get().items.find(item => item.product._id === productId)
                if (existedItem) {
                    return existedItem.quantity
                } else {
                    return 0
                }
            },
            getGroupedItems: () => {
                return get().items
            }
        }),
        {
            name: 'bear-storage',
        },
    ),
)