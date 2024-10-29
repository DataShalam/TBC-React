import Link from "next/link";
import React from "react";

import "./Post.css";

export default function Post({ post }) {
  return (
    <Link key={post.id} className="postLink" href={`/postsPage/${post.id}`}>
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
  );
}
