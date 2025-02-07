import { notFound } from "next/navigation";

import NotFound from "../../../../../components/NotFound/NotFound";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";

export default async function postPage({ params }) {
  const { postID } = params;

  const res = await fetch(`https://dummyjson.com/posts/${postID}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const post = await res.json();

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 max-w-[65vw] my-0 mx-auto p-5 rounded-2xl bg-light-card dark:bg-dark-card text-light dark:text-dark">
      {post?.length === 0 ? (
        <div>loading...</div>
      ) : (
        <>
          <h1 className="text-4xl font-bold p-6 rounded-xl bg-light-heading dark:bg-dark-heading">
            {post.title}
          </h1>
          <p className="w-1/2 text-xl">{post.body}</p>
          <div className="flex items-center justify-center gap-10 text-xl font-semibold bg-light-heading dark:bg-dark-heading p-3 rounded-xl">
            <div className="flex items-center gap-3">
              <ThumbUpIcon color={"inherit"} height="28px" width="28px" />

              <p>{post.reactions.likes}</p>
            </div>
            <div className="flex items-center gap-3">
              <ThumbDownIcon color={"inherit"} height="28px" width="28px" />

              <p>{post.reactions.dislikes}</p>
            </div>
          </div>
          <p className="flex gap-2 text-2xl font-bold">
            Tags:{" "}
            {post.tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}{" "}
          </p>
          <p className="text-xl font-semibold mb-5 text-light-navigation-border dark:text-dark-navigation-border">
            views: {post.views}
          </p>
        </>
      )}
    </div>
  );
}
