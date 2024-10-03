import React from "react";
import Post from "./Components/Post/Post.jsx";
import Fighters from "../PageData/Data.js";

export default function MainPage() {
  return (
    <div className="blog-container">
      {Fighters.map(({ name, surName, email, text, src }, index) => {
        const style =
          index % 2 === 0
            ? { alignSelf: "flex-start" }
            : { alignSelf: "flex-end" };

        return (
          <Post
            style={style}
            key={index}
            name={name}
            surName={surName}
            email={email}
            text={text}
            src={src}
          />
        );
      })}
    </div>
  );
}
