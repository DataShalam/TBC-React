import { notFound } from "next/navigation";

import NotFound from "../../../../../components/NotFound/NotFound";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";

export default async function postPage({ params }) {
  const { postID } = params;
  const res = await fetch(`https://dummyjson.com/posts/${postID}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const post = await res.json();
  if (!post) return <NotFound />;

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-[90vw] md:w-[65vw] mx-auto p-3 md:p-5 rounded-xl bg-light-card dark:bg-dark-card text-light dark:text-dark">
      {post?.length === 0 ? (
        <div>loading...</div>
      ) : (
        <>
          <h1 className="text-2xl md:text-4xl font-bold p-4 md:p-6 rounded-xl bg-light-heading dark:bg-dark-heading text-center">
            {post.title}
          </h1>

          <p className="w-full md:w-1/2 text-lg md:text-xl px-2">{post.body}</p>

          <div className="flex items-center justify-center gap-6 md:gap-10 text-lg md:text-xl font-semibold bg-light-heading dark:bg-dark-heading p-3 rounded-xl w-full md:w-auto">
            <div className="flex items-center gap-2">
              <ThumbUpIcon color={"inherit"} height="24px" width="24px" />
              <p>{post.reactions.likes}</p>
            </div>
            <div className="flex items-center gap-2">
              <ThumbDownIcon color={"inherit"} height="24px" width="24px" />
              <p>{post.reactions.dislikes}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xl md:text-2xl font-bold">
            <span>Tags:</span>
            {post.tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>

          <p className="text-lg md:text-xl font-semibold mb-3 md:mb-5 text-light-navigation-border dark:text-dark-navigation-border">
            views: {post.views}
          </p>
        </>
      )}
    </div>
  );
}
