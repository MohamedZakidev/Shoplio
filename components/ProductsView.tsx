import { Product } from "@/sanity.types";
import ProductsGrid from "./ProductsGrid";

type ProductsViewProps = {
    products: Product[];
}
function ProductsView({ products }: ProductsViewProps) {
    return (
        <div className="flex-1 border">
            <div>
                <ProductsGrid products={products} />
                <hr className="w-1/2 sm:w-3/4" />
            </div>
        </div>
    )
}

export default ProductsView
