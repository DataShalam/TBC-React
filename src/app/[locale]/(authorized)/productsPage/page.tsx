import SortComponent from "../../../../components/ProductComponents/sort/sort";
import SearchComponent from "../../../../components/ProductComponents/search/search";
import Product from "../../../../components/ProductComponents/product/Product";
import AddProduct from "../../../../components/ProductComponents/addProduct/AddProduct";
import { createClient } from "../../../../utils/supabase/server";

export default async function ProductsPage({ searchParams }) {
  const supabaseConnection = await createClient();
  const { data: products, error } = await supabaseConnection
    .from("Products")
    .select("*");

  const search = searchParams?.search || "";
  const order = searchParams?.order || "default";

  return (
    <div className="flex flex-col items-center gap-6 mx-auto mt-0 mb-24">
      <h1 className="text-6xl mb-5 text-light dark:text-dark drop-shadow-[0_0_1rem_rgba(236,223,204,0.8)]">
        Products
      </h1>
      <div className="flex justify-between items-center w-[93rem] rounded-xl p-4 mb-4 bg-light-card dark:bg-dark-card">
        <SortComponent />
        {/* <AddProduct
          products={products}
          setProducts={setProducts}
          search={search}
          order={order}
        /> */}
        <SearchComponent />
      </div>

      <div className="grid grid-cols-3 gap-7">
        {products.length > 0 ? (
          products.map((item) => <Product item={item} key={item.Id} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
