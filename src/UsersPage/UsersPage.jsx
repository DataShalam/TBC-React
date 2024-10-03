import React from "react";
import "./UsersPage.css";

import User from "./Components/User.jsx";
import Fighters from "../PageData/Data.js";

export default function UsersPage() {
  return (
    <div className="users-page">
      <div className="users-container">
        {Fighters.map(({ name, surName, email, text, src }, index) => {
          return <User key={index} name={name} surName={surName} src={src} />;
        })}
      </div>
    </div>
  );
}
