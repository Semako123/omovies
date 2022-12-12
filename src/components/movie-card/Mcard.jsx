import React from "react";
import "./movie-card.css";
import Tag from "../tag/Tag";
import { FaGreaterThan } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { useSelector } from "react-redux";

const Mcard = ({ genre, title, img, rating }) => {
  const genreList = useSelector((state) => state.genre);
  return (
    <div className="omv__mcard">
      {"card" && <img src={img} alt="" />}
      <div className="omv__mcard-overlay">
        <div className="omv__carousel-container_tags omv__mcard-tag">
          {genre.map((x) => (
            <Tag key={x}>{genreList[x]}</Tag>
          ))}
        </div>

        <div>
          {[...Array(Math.floor(rating / 2))].map((x) => (
            <AiFillStar color="#fff" key={x} />
          ))}
          {rating / 2 - Math.floor(rating / 2) > 0.4 ? <BsStarHalf color="#fff" /> : <></>}
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
