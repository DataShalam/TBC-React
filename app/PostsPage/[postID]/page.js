import { notFound } from "next/navigation";

import "./PostPage.css";
import NotFoundPage from "../../NotFound/NotFound.js";

export default async function PostPage({ params }) {
  const { postID } = params;

  const res = await fetch(`https://dummyjson.com/posts/${postID}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // If the post is not found or there is an error, show 404 page
    return notFound();
  }

  const post = await res.json();

  // Return not found page if the post does not exist
  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="single-Post-Container">
      {post?.length === 0 ? (
        <div>loading...</div>
      ) : (
        <>
          <h1 className="single-Post-Title">{post.title}</h1>
          <p className="single-Post-Body">{post.body}</p>
          <div className="single-Post-Reactions">
            <div className="single-Post-Like">
              <ion-icon name="thumbs-up-outline"></ion-icon>

              <p>{post.reactions.likes}</p>
            </div>
            <div className="single-Post-Dislike">
              <ion-icon name="thumbs-down-outline"></ion-icon>

              <p>{post.reactions.dislikes}</p>
            </div>
          </div>
          <p className="single-Post-Tags">
            Tags:{" "}
            {post.tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}{" "}
          </p>
          <p className="single-Post-Viwes">views: {post.views}</p>
        </>
      )}
    </div>
  );
}
