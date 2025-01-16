import { createClient } from "../../../../../utils/supabase/server";
import { Product } from "../../../../../types/Product";

export default async function ProductDetail({ params }) {
  const supabaseConnection = await createClient();
  const { data, error } = await supabaseConnection
    .from("Products")
    .select(`*`)
    .eq("Id", params.productID);

  const product: Product = data[0];

  const defaultImagePath =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEXq6upqamrV1dXu7u5iYmLk5ORcXFxfX1+2trbKyspmZma5ubnW1tbx8fFlZWXl5eXc3Nx3d3e/v7+kpKRubm6ysrLGxsaPj4+bm5uVlZWCgoJ8fHyhoaFYWFhTU1OKior/FHn9AAAEUUlEQVR4nO2dCZOqOhBGwQAZGUJwX9/z///LC5GdoIiQNPd+p6ampkZZjmmSTkfUcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/KswC8f0jWJB0PkvMMj/Ngxj1yCeDcPQdWNuAi99Lbkdw3i3NsIuttWG3q9gBhC/nj1DI304g+Fc6AzZHMp0DJmQq8gRkx+IjKE4bgLOg5M/dTtSMRR3rsbmmK8nViRiyA68yD+CZNoDETGUQZlhhY9pr0UahuzgVUlkMO1MgIahuISVIT9OeiUSMTzVDL3tGMPesZSI4bk2meKrEYYs+um5fGkYOkdeGcZjdifdoGeYIWIo9lWQ7sb0pen2XqJVJGLIoqIR482YGL2p61jqNiVi6LDVnqdnGQaPEfsSD3UZh9oXh4ph2hduH5vbeT0iRMUlH01jXbJAxjCbXKSMCFGxK9MF79xVJGQ4EnGo9cP80FFcvKHYVimtNiFauiFbNwTTrLadLyzckEWe2yJszaGXbcj8jqAb7pvrMIs2ZHIfdgzd+NrobZZtuNEIpmPGpa5I0nBgVVFce5Z3eD21pWgodoPmT+LUvQiLDrU2xSRoyFZBrJ8mNBDnXsHGHJOiYToTeq8odrxfMFUsd0DPUNzV1fWmMix+Xwq67r54JjnDNEafp6id7JXPOr4RdMNbvj09w3y2H+5l/8bly/CC+PTsUKkZ1mpSm95tWfKikynJyyHEDOuJdDpl7wlUf4BfSqDKb8QMnX3tDOOrvrTEdLmaVjErv9EyFJdGlqJXzMtOQ8jKb6QM2brVQ3qawktvrqYjlIyUodNthFNbsSw7DTPckDJsxehT8dJUFPdPBFX5jY5hJ0afio3yWaPsNAjvvrX4jiHW/pcOfq8UW2WnYYo3a+9raxnqYvSpWM72hLaVh1haEOzWvPubpyiCVosbizSUr2Z7SpElo9+xScEwX1zpIfgV2RLhaAgYsu3rAAy2wtGXnZZi+CpGFfz4SSpDz1A83rZPPL4FCRi+i9GvsW7ozyxo3VBcZxa0bch+5m5Cy4a69aO/y1Bcv+klF2Ao5o9Ry4aJAUGrhmJ4WWmZhp/P2RdmyIzEqE1DsTEiaPHOrsP8Q6Fdw0ELLEs23N4MCVq7h9TQRWjR0BwwhCEM7RtauVudewYJbBj+mORgw9DErfgVNgwBAAAAAAAAAAAAAAAAAAAANcq1o9Za0oIXlbKTlurD8JOKqEvt0fS5UkrHzhcEDEG1hJRKKYpW36DEM99itxTIxGpaXxrW/sxULbtJP/nOZ5Bz4ks70evPL1fTNN+YyfPAZvTU74k/f/kdJtuv0IyMGvrGDVcr04GaGPYzHKQKmZiyTBJLvWlGfSyMJut6ql2mY6IttQL12soJspmGoRrtZbl/IuSueTqaZZ4fGOVpqk/Qqw0rfgpkhvZbqtQjL7YEAAAAAAAAAAAAAAAAAAAAAIBp+QOn81PHqLV3GQAAAABJRU5ErkJggg==";

  return (
    <>
      <div className="w-[60vw] my-0 mx-auto p-9 mb-12 rounded-2xl flex justify-between gap-8 text-light dark:text-dark bg-light-card dark:bg-dark-card">
        {product === null ? (
          <div>loading...</div>
        ) : (
          <>
            <div className="flex flex-col justify-start">
              <h1 className="text-4xl p-5  rounded-xl bg-light-hover-whole dark:bg-dark-hover-whole">
                {product.Title}
              </h1>
              <p className="text-xl my-3 mx-0">{product.Description}</p>
              <div className="text-xl my-4 mx-0">
                Tags:{" "}
                {product.Tags?.map((tag) => (
                  <span
                    key={tag}
                    className="py-2 px-3 mr-2 rounded-md bg-light-heading dark:bg-dark-heading text-light dark:text-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xl my-3 mx-0">
                Category:{" "}
                <span className="font-bold">
                  {product.Category ? product.Category : ""}
                </span>
              </p>
              <p className="text-xl my-3 mx-0">
                Weight:{" "}
                <span className="font-bold">
                  {product.Weight ? product.Weight : ""}kg
                </span>
              </p>
              <p className="text-xl my-3 mx-0">
                Price:
                <span className="font-bold"> ${product.Price}</span>
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img
                src={product.Images ? product.Images[0] : defaultImagePath}
                alt={product.Title}
                className="w-[30rem] h-auto rounded-2xl object-contain"
              />
              <div className="flex gap-4 overflow-x-scroll max-w-xs snap-x snap-mandatory scroll-px-4 scrollbar-hide">
                {product.Images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-[6rem] h-auto rounded-lg object-contain snap-center"
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-[60vw] my-0 mx-auto p-9 mb-5 rounded-2xl flex-row justify-between gap-8 text-light dark:text-dark bg-light-card dark:bg-dark-card">
        <h3 className="text-center text-4xl mb-4">Reviews</h3>
        <div className="flex flex-col gap-4">
          {product.Reviews?.map((review, index) => (
            <div
              key={index}
              className="flex flex-col p-5 gap-4 rounded-2xl bg-light-hover-whole dark:bg-dark-hover-whole text-light dark:text-dark"
            >
              <p className="text-xl">{review}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
