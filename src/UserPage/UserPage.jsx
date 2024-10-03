import React from "react";
import { useParams } from "react-router-dom";
import Fighters from "../PageData/Data.js";
import "./UserPage.css";

export default function UserPage() {
  const { userId } = useParams();
  console.log(userId);

  const fighter = Fighters.find((f) => f.name + f.surName === userId);

  if (!fighter) {
    return <div>Fighter not found</div>;
  }

  return (
    <div className="user-page">
      <div className="user-container-solo">
        <img
          className="user-image-solo"
          src={fighter.src}
          alt={`${fighter.name} ${fighter.surName}`}
        />

        <div className="user-description-solo">
          <h1 className="black-color">
            Name: <span className="white-color">{`${fighter.name}`}</span>
          </h1>
          <h1 className="black-color">
            Last Name:
            <span className="white-color">{` ${fighter.surName}`}</span>
          </h1>

          <div className="user-email-solo">
            <span>Contact: </span>
            <a href={`mailto:${fighter.email}`}>{fighter.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
