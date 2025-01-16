import React from "react";
import PostCard from "../../../../components/BlogComponents/post/PostCard";

export default async function postsPage() {
  const res = await fetch("https://dummyjson.com/posts", {
    cache: "no-store",
  });
  const data = await res.json();
  const posts = data.posts;

  return (
    <div className="flex flex-col items-center mx-auto mt-0 mb-16 gap-7">
      <h1 className="text-5xl mb-5 text-light dark:text-dark drop-shadow-[0_0_1rem_rgba(236,223,204,0.8)]">
        Posts
      </h1>

      {posts?.length === 0 ? (
        <div>
          <div>No Products Found</div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-4 md:grid grid-cols-3 pt-12">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
