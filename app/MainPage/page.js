import Post from "./Components/Post/Post.js";
import Fighters from "../PageData/Data.js";
import "./MainPage.css";

// import { createContext } from "react";

// const Context = createContext();

export default function MainPage() {
  return (
    <div className="blog-container">
      {Fighters.map(({ name, surName, email, text, src }, index) => {
        const isEven = index % 2 === 0;
        const style = {
          alignSelf: isEven ? "flex-start" : "flex-end",
          transform: isEven ? "translateX(-100px)" : "translateX(100px)",
        };
        return (
          <Post
            key={index}
            name={name}
            surName={surName}
            email={email}
            text={text}
            src={src}
            style={style}
            isReversed={!isEven}
          />
        );
      })}
    </div>
  );
}
