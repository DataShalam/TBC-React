import React from "react";
import { Link } from "react-router-dom";

import "./User.css";

export default function User({ name, surName, src }) {
  return (
    <Link to={`/users/${name + surName}`}>
      <div className="user-container">
        <div>
          <img className="user-image" src={src} alt={name + surName} />
        </div>
        <h2 className="user-name">{`${name} ${surName}`}</h2>
      </div>
    </Link>
  );
}
