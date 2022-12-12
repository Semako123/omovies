import React from "react";
import "./movie-card.css";
import Tag from "../tag/Tag";
import card from "../../assets/images/card.png";
import { FaGreaterThan } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const Mcard = ({ genre, title, img }) => {
  const star = [0, 1, 2, 3, 4];
  return (
    <div className="omv__mcard">
      {"card" && <img src={img} alt="card" />}
      <div className="omv__mcard-overlay">
        <Tag>{genre}</Tag>
        <div>
          {star.map((x) => (
            <AiFillStar color="#fff" key={x} />
          ))}
        </div>
        <h4>{title}</h4>
        <h5>
          Details
          <span className="card-icon">
            <FaGreaterThan />
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Mcard;
