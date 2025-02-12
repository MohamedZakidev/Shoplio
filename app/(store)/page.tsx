import ProductsView from "@/components/ProductsView";
import Sales from "@/components/Sales";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllSales } from "@/sanity/lib/sales/getAllSales";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const sales = await getAllSales();
  console.log(sales)
  return (
    <div>
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <Sales sales={sales} />
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
