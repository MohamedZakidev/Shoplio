import CategoriesView from "@/components/CategoriesView";
import ProductsView from "@/components/ProductsView";
import SalesBanner from "@/components/SalesBanner";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div>
      <SalesBanner />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <div className="flex flex-col ">
          <CategoriesView />
          <ProductsView products={products} />
        </div>
      </div>
    </div>
  );
}
