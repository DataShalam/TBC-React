import React from "react";
import Fighters from "./../../../PageData/Data.js";

import "./Post.css";

//

export default function Post({ name, surName, email, text, src }) {
  // const fighter = Fighters[1];
  return (
    <>
      <div className="post-container">
        <img src={src} alt={`${name} ${surName}`} className="post-image" />
        <div>
          <h2>
            {name} {surName}
          </h2>
          <a href={`mailto:${email}`}>Email: {email}</a>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}
