import CategoriesView from "@/components/CategoriesView";
import ProductsView from "@/components/ProductsView";
import SalesBanner from "@/components/SalesBanner";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories()

  return (
    <div>
      <SalesBanner />
      <div className="flex flex-col min-h-screen bg-gray-100 p-4">
        <div className="flex flex-col">
          <CategoriesView categories={categories} />
          <ProductsView products={products} />
        </div>
      </div>
    </div>
  );
}
