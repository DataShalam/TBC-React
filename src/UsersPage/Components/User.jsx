import React from "react";
import "./User.css";

export default function User({ name, surName, src }) {
  return (
    <>
      <div className="user-container">
        <div>
          <img src={src} alt={name + surName} />
        </div>
        <h2 className="user-name">{name + surName}</h2>
      </div>
    </>
  );
}
