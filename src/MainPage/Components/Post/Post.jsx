import React from "react";
import "./Post.css";

export default function Post({
  name,
  surName,
  email,
  text,
  src,
  style,
  isReversed,
}) {
  return (
    <div className="post" style={style}>
      <div className={`post-container ${isReversed ? "reversed" : ""}`}>
        <img src={src} alt={`${name} ${surName}`} className="post-image" />
        <div className="post-content">
          <div>
            <h2>
              {name} {surName}
            </h2>
            <a href={`mailto:${email}`}>Email: {email}</a>
          </div>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
