"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import "./PostPage.css";

export default function PostPage({ params }) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postID } = params;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`https://dummyjson.com/posts/${postID}`);
        if (!res.ok) {
          return notFound();
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [postID]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="single-Post-Container">
      <h1 className="single-Post-Title">{posts.title}</h1>
      <p className="single-Post-Body">{posts.body}</p>
      <div className="single-Post-Reactions">
        <div className="single-Post-Like">
          <ion-icon name="thumbs-up-outline"></ion-icon>

          <p>{posts.reactions.likes}</p>
        </div>
        <div className="single-Post-Dislike">
          <ion-icon name="thumbs-down-outline"></ion-icon>

          <p>{posts.reactions.dislikes}</p>
        </div>
      </div>
      <p className="single-Post-Tags">
        Tags:{" "}
        {posts.tags.map((tag, index) => (
          <span key={index}>#{tag}</span>
        ))}{" "}
      </p>
      <p className="single-Post-Viwes">views: {posts.views}</p>
      <div>{/* <ReturnButton /> */}</div>
    </div>
  );
}
