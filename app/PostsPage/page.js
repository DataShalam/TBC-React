"use client";

import "./PostsPage.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://dummyjson.com/posts");
      const data = await res.json();

      setTimeout(() => {
        setPosts(data.posts);
        setLoading(false);
      }, 2000);
    }

    fetchData();
  }, []);

  return (
    <div className="postContainer">
      <h1 className="postHeader">Posts</h1>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="posts">
          {posts.map((post) => (
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
