import React from "react";
import Link from "next/link";
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
            <Link
              key={post.id}
              className="postLink"
              href={`/PostsPage/${post.id}`}
            >
              <div key={post.id} className="post">
                <h2 className="postTitle">{post.title}</h2>
                <p className="postContent">{post.body}</p>
                <div>
                  <div className="reactions">
                    <div className="like">
                      <ion-icon name="thumbs-up-outline"></ion-icon>
                      <p>{post.reactions.likes}</p>
                    </div>
                    <div className="dislike">
                      <ion-icon name="thumbs-down-outline"></ion-icon>
                      <p>{post.reactions.dislikes}</p>
                    </div>
                  </div>
                  <p className="postTags">
                    Tags:{" "}
                    {post.tags.map((tag, index) => (
                      <span key={index}>#{tag}</span>
                    ))}{" "}
                  </p>
                </div>
                <p className="postViwes">views: {post.views}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
