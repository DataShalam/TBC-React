'use client';

import { useEffect, useState } from 'react';
import DeleteProduct from '../../../../components/DeleteProduct/DeleteProduct.jsx';
import EditProduct from '../../../../components/EditProduct/EditProduct.jsx';

export async function fetchProductFromAPI(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error(`Product with id '${id}' not found`);
  }
  const data = await res.json();
  return data;
}

export default async function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve 'products__default' from localStorage and parse it
    const storedProducts = JSON.parse(
      localStorage.getItem('products__default')
    );

    if (storedProducts) {
      // Find the product by its ID in the storedProducts array or object
      const foundProduct = storedProducts.find(
        (prod) => prod.id === parseInt(params.productID)
      );

      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
      } else {
        fetchProductFromAPI(params.id).then((data) => {
          setProduct(data); // Update the product state
          setLoading(false);

          const updatedProducts = [...storedProducts, data];
          localStorage.setItem(
            'products__default',
            JSON.stringify(updatedProducts)
          );
        });
      }
    } else {
      fetchProductFromAPI(params.id).then((data) => {
        setProduct(data); // Update the product state
        setLoading(false);

        localStorage.setItem(
          'products__default',
          JSON.stringify([data]) // Initialize with the first product
        );
      });
    }
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const defaultImagePath =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEXq6upqamrV1dXu7u5iYmLk5ORcXFxfX1+2trbKyspmZma5ubnW1tbx8fFlZWXl5eXc3Nx3d3e/v7+kpKRubm6ysrLGxsaPj4+bm5uVlZWCgoJ8fHyhoaFYWFhTU1OKior/FHn9AAAEUUlEQVR4nO2dCZOqOhBGwQAZGUJwX9/z///LC5GdoIiQNPd+p6ampkZZjmmSTkfUcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/KswC8f0jWJB0PkvMMj/Ngxj1yCeDcPQdWNuAi99Lbkdw3i3NsIuttWG3q9gBhC/nj1DI304g+Fc6AzZHMp0DJmQq8gRkx+IjKE4bgLOg5M/dTtSMRR3rsbmmK8nViRiyA68yD+CZNoDETGUQZlhhY9pr0UahuzgVUlkMO1MgIahuISVIT9OeiUSMTzVDL3tGMPesZSI4bk2meKrEYYs+um5fGkYOkdeGcZjdifdoGeYIWIo9lWQ7sb0pen2XqJVJGLIoqIR482YGL2p61jqNiVi6LDVnqdnGQaPEfsSD3UZh9oXh4ph2hduH5vbeT0iRMUlH01jXbJAxjCbXKSMCFGxK9MF79xVJGQ4EnGo9cP80FFcvKHYVimtNiFauiFbNwTTrLadLyzckEWe2yJszaGXbcj8jqAb7pvrMIs2ZHIfdgzd+NrobZZtuNEIpmPGpa5I0nBgVVFce5Z3eD21pWgodoPmT+LUvQiLDrU2xSRoyFZBrJ8mNBDnXsHGHJOiYToTeq8odrxfMFUsd0DPUNzV1fWmMix+Xwq67r54JjnDNEafp6id7JXPOr4RdMNbvj09w3y2H+5l/8bly/CC+PTsUKkZ1mpSm95tWfKikynJyyHEDOuJdDpl7wlUf4BfSqDKb8QMnX3tDOOrvrTEdLmaVjErv9EyFJdGlqJXzMtOQ8jKb6QM2brVQ3qawktvrqYjlIyUodNthFNbsSw7DTPckDJsxehT8dJUFPdPBFX5jY5hJ0afio3yWaPsNAjvvrX4jiHW/pcOfq8UW2WnYYo3a+9raxnqYvSpWM72hLaVh1haEOzWvPubpyiCVosbizSUr2Z7SpElo9+xScEwX1zpIfgV2RLhaAgYsu3rAAy2wtGXnZZi+CpGFfz4SSpDz1A83rZPPL4FCRi+i9GvsW7ozyxo3VBcZxa0bch+5m5Cy4a69aO/y1Bcv+klF2Ao5o9Ry4aJAUGrhmJ4WWmZhp/P2RdmyIzEqE1DsTEiaPHOrsP8Q6Fdw0ELLEs23N4MCVq7h9TQRWjR0BwwhCEM7RtauVudewYJbBj+mORgw9DErfgVNgwBAAAAAAAAAAAAAAAAAAAANcq1o9Za0oIXlbKTlurD8JOKqEvt0fS5UkrHzhcEDEG1hJRKKYpW36DEM99itxTIxGpaXxrW/sxULbtJP/nOZ5Bz4ks70evPL1fTNN+YyfPAZvTU74k/f/kdJtuv0IyMGvrGDVcr04GaGPYzHKQKmZiyTBJLvWlGfSyMJut6ql2mY6IttQL12soJspmGoRrtZbl/IuSueTqaZZ4fGOVpqk/Qqw0rfgpkhvZbqtQjL7YEAAAAAAAAAAAAAAAAAAAAAIBp+QOn81PHqLV3GQAAAABJRU5ErkJggg==';

  return (
    <div className="w-[60vw] my-0 mx-auto p-9 rounded-2xl flex justify-between gap-8 text-light dark:text-dark bg-light-card dark:bg-dark-card">
      {product?.length === 0 ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl p-5 rounded-xl bg-light-hover-whole dark:bg-dark-hover-whole">
              {product.title}
            </h1>
            <p className="text-xl my-3 mx-0">{product.description}</p>
            <p className="text-xl my-3 mx-0">Price: ${product.price}</p>

            <p className="text-xl my-3 mx-0">
              Category: {product.category ? product.category : ''}
            </p>
            <div className="text-xl my-4 mx-0">
              Tags:{' '}
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="py-2 px-3 mr-2 rounded-md bg-light-heading dark:bg-dark-heading text-light dark:text-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <img
              src={product.images ? product.images[0] : defaultImagePath}
              alt={product.title}
              className="w-[25rem] h-auto rounded-2xl object-contain"
            />
            <div className="flex justify-between items-center gap-4 mt-3">
              <DeleteProduct productId={params.productID} />
              <EditProduct productId={params.productID} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
