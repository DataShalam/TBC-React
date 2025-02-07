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
    <div className="flex flex-col items-center gap-6 mx-auto mt-0 mb-24">
      <ProductsHeader />
      <div className="flex justify-between items-center w-[93rem] rounded-xl p-4 mb-4 bg-light-card dark:bg-dark-card">
        <SortComponent />
        <AddProduct />
        <SearchComponent />
      </div>

      <div className="grid grid-cols-3 gap-7">
        {products ? (
          products.map((item) => <Product item={item} key={item.Id} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
