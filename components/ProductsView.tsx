import { Category, Product } from "@/sanity.types";
import ProductsGrid from "./ProductsGrid";

type ProductsViewProps = {
    products: Product[];
    categories: Category[];
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductsView({ products, categories }: ProductsViewProps) {
    return (
        <div className="flex flex-col">
            <div className="w-full sm:w-[200px]">
                {/* categories component to be added */}
            </div>
            {/* products */}
            <div className="flex-1">
                <div>
                    <ProductsGrid products={products} />
                    <hr className="w-1/2 sm:w-3/4" />
                </div>
            </div>
        </div>
    )
}

export default ProductsView
