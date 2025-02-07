"use client";

import Link from "next/link";
import React from "react";
import { ThumbsUpOutline, ThumbsDownOutline } from "react-ionicons";
import { Post } from "../../../types/Post";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link key={post.id} href={`postsPage/${post.id}`}>
      <div
        key={post.id}
        className="flex flex-col items-center justify-between gap-5 max-w-[35rem] p-5 rounded-2xl h-full bg-light-card dark:bg-dark-card text-light dark:text-dark hover:-translate-y-3 transition-transform duration-200"
      >
        <div className="flex flex-col items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold mb-3 p-4 rounded-xl bg-light-heading text-light dark:text-dark dark:bg-dark-heading">
            {post.title}
          </h2>
          <p className="text-lg text-center">
            {post.body.length > 100
              ? post.body.substring(0, 200) + "..."
              : post.body}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-10 p-3 rounded-xl text-lg bg-light-heading dark:bg-dark-heading">
            <div className="flex justify-center items-center gap-3">
              <div className="text-light dark:text-dark">
                <ThumbsUpOutline color={"inherit"} height="28px" width="28px" />
              </div>
              <p>{post.reactions.likes}</p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <ThumbsDownOutline color={"inherit"} height="28px" width="28px" />
              <p>{post.reactions.dislikes}</p>
            </div>
          </div>
          <p className="flex items-center gap-2 font-extrabold text-base my-5">
            Tags:{" "}
            {post.tags.map((tag, index) => (
              <span
                className="bg-light-heading dark:bg-dark-heading p-2 rounded-2xl"
                key={index}
              >
                #{tag}
              </span>
            ))}{" "}
          </p>
          <p className="text-lg font-semibold mb-5 items-center">
            views: {post.views}
          </p>
        </div>
      </div>
    </Link>
  );
}
