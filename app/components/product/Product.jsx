import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Product({ item }) {
  const defaultImagePath =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEXq6upqamrV1dXu7u5iYmLk5ORcXFxfX1+2trbKyspmZma5ubnW1tbx8fFlZWXl5eXc3Nx3d3e/v7+kpKRubm6ysrLGxsaPj4+bm5uVlZWCgoJ8fHyhoaFYWFhTU1OKior/FHn9AAAEUUlEQVR4nO2dCZOqOhBGwQAZGUJwX9/z///LC5GdoIiQNPd+p6ampkZZjmmSTkfUcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/KswC8f0jWJB0PkvMMj/Ngxj1yCeDcPQdWNuAi99Lbkdw3i3NsIuttWG3q9gBhC/nj1DI304g+Fc6AzZHMp0DJmQq8gRkx+IjKE4bgLOg5M/dTtSMRR3rsbmmK8nViRiyA68yD+CZNoDETGUQZlhhY9pr0UahuzgVUlkMO1MgIahuISVIT9OeiUSMTzVDL3tGMPesZSI4bk2meKrEYYs+um5fGkYOkdeGcZjdifdoGeYIWIo9lWQ7sb0pen2XqJVJGLIoqIR482YGL2p61jqNiVi6LDVnqdnGQaPEfsSD3UZh9oXh4ph2hduH5vbeT0iRMUlH01jXbJAxjCbXKSMCFGxK9MF79xVJGQ4EnGo9cP80FFcvKHYVimtNiFauiFbNwTTrLadLyzckEWe2yJszaGXbcj8jqAb7pvrMIs2ZHIfdgzd+NrobZZtuNEIpmPGpa5I0nBgVVFce5Z3eD21pWgodoPmT+LUvQiLDrU2xSRoyFZBrJ8mNBDnXsHGHJOiYToTeq8odrxfMFUsd0DPUNzV1fWmMix+Xwq67r54JjnDNEafp6id7JXPOr4RdMNbvj09w3y2H+5l/8bly/CC+PTsUKkZ1mpSm95tWfKikynJyyHEDOuJdDpl7wlUf4BfSqDKb8QMnX3tDOOrvrTEdLmaVjErv9EyFJdGlqJXzMtOQ8jKb6QM2brVQ3qawktvrqYjlIyUodNthFNbsSw7DTPckDJsxehT8dJUFPdPBFX5jY5hJ0afio3yWaPsNAjvvrX4jiHW/pcOfq8UW2WnYYo3a+9raxnqYvSpWM72hLaVh1haEOzWvPubpyiCVosbizSUr2Z7SpElo9+xScEwX1zpIfgV2RLhaAgYsu3rAAy2wtGXnZZi+CpGFfz4SSpDz1A83rZPPL4FCRi+i9GvsW7ozyxo3VBcZxa0bch+5m5Cy4a69aO/y1Bcv+klF2Ao5o9Ry4aJAUGrhmJ4WWmZhp/P2RdmyIzEqE1DsTEiaPHOrsP8Q6Fdw0ELLEs23N4MCVq7h9TQRWjR0BwwhCEM7RtauVudewYJbBj+mORgw9DErfgVNgwBAAAAAAAAAAAAAAAAAAAANcq1o9Za0oIXlbKTlurD8JOKqEvt0fS5UkrHzhcEDEG1hJRKKYpW36DEM99itxTIxGpaXxrW/sxULbtJP/nOZ5Bz4ks70evPL1fTNN+YyfPAZvTU74k/f/kdJtuv0IyMGvrGDVcr04GaGPYzHKQKmZiyTBJLvWlGfSyMJut6ql2mY6IttQL12soJspmGoRrtZbl/IuSueTqaZZ4fGOVpqk/Qqw0rfgpkhvZbqtQjL7YEAAAAAAAAAAAAAAAAAAAAAIBp+QOn81PHqLV3GQAAAABJRU5ErkJggg==";

  return (
    <div
      key={item.id}
      className="flex flex-col w-[30rem] min-h-[40rem] rounded-2xl bg-light-card dark:bg-dark-card hover:-translate-y-4 transition-transform"
    >
      <Link href={`/productsPage/${item.id}`} className="rounded-2xl">
        <Image
          src={item.thumbnail ? item.thumbnail : defaultImagePath}
          alt={item.title}
          width={450}
          height={0}
          className="my-0 mx-auto"
        />
        <div className="flex flex-col items-center grow p-5">
          <h2 className="text-2xl mb-3 p-5 rounded-xl bg-light-heading text-light dark:bg-dark-heading dark:text-dark">
            {item.title}
          </h2>
          <p className="text-base my-5 mx-0 text-light dark:text-dark">
            {item.description}
          </p>
          <p className="text-xl font-bold self-end mt-auto text-[#dc9933]">
            ${item.price}
          </p>
        </div>
      </Link>
    </div>
  );
}
