import React from "react";
import PostCard from "../../../../components/BlogComponents/post/PostCard";
import PostsHeader from "../../../../components/UseLocaleComponents/Headers/PostsHeader";

export default async function postsPage() {
  const res = await fetch("https://dummyjson.com/posts", {
    cache: "no-store",
  });
  const data = await res.json();
  const posts = data.posts;

  return (
    <div className="flex flex-col items-center mx-auto mt-0 mb-16 gap-7">
      <PostsHeader />

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
