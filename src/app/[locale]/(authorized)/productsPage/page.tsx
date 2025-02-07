import SortComponent from "../../../../components/ProductComponents/sort/sort";
import SearchComponent from "../../../../components/ProductComponents/search/search";
import Product from "../../../../components/ProductComponents/product/Product";
import AddProduct from "../../../../components/ProductComponents/addProduct/AddProduct";
import ProductsHeader from "../../../../components/UseLocaleComponents/Headers/ProductsHeader";
import { createClient } from "../../../../utils/supabase/server";

export default async function ProductsPage({ searchParams }) {
  const { title, sortBy, order } = (await searchParams) || "";
  const supabaseConnection = await createClient();

  let query = supabaseConnection.from("Products").select("*");

  if (title) {
    query = query.ilike("Title", `%${title}%`);
  }

  if (sortBy) {
    query = query.order(sortBy, { ascending: order === "asc" });
  }

  const { data: products, error } = await query;

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 mx-4 md:mx-auto mt-0 mb-12 md:mb-24">
      <ProductsHeader />

      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-[93rem] gap-4 rounded-xl p-3 md:p-4 mb-2 md:mb-4 bg-light-card dark:bg-dark-card">
        <SortComponent />
        <AddProduct />
        <SearchComponent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 w-full md:w-auto">
        {products ? (
          products.map((item) => <Product item={item} key={item.Id} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
