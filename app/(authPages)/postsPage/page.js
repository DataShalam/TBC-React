import React from "react";
import Post from "../../components/post/Post";

import "./PostsPage.css";

export default async function PostsPage() {
  const res = await fetch("https://dummyjson.com/posts", {
    cache: "no-store",
  });
  const data = await res.json();
  const posts = data.posts;

  return (
    <div className="postContainer">
      <h1 className="postHeader">Posts</h1>

      {posts?.length === 0 ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="posts">
          {posts?.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
