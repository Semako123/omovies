import React from "react";
import "./actors-card.css";

const Acard = ({ cName, rName, imgLink }) => {
  return (
    <div className="omv__actors-card">
      <div className="omv__actors-card_image">
        <img src={`https://image.tmdb.org/t/p/original/${imgLink}`} alt="" />
      </div>
      <div className="omv__actors-card_name">
        <p>{cName}</p>
        <p>{rName}</p>
      </div>
    </div>
  );
};

export default Acard;
