import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";

async function CategoriesView() {
    const categories = await getAllCategories();

    return (
        <div className="w-full sm:w-[200px]">
            {categories[0].title}
        </div>
    )
}

export default CategoriesView
