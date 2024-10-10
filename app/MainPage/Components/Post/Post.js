import React from "react";
import "./Post.css";
// import { Link } from "react-router-dom";

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
        {/* <Link to={`/users/${name + surName}`}> */}
        <img src={src} alt={`${name} ${surName}`} className="post-image" />
        {/* </Link> */}
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
