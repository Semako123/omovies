import React from "react";
import "./movie-card.css";
import Tag from "../tag/Tag";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";

const Mcard = ({ genre, title, img, rating }) => {
  const genreList = useSelector((state) => state.genre);
  return (
    <div className="omv__mcard">
      <div className="omv__mcard-ratingBar">
        <CircularProgressbar
          backgroundPadding={3}
          background={true}
          value={Math.round(rating * 10)}
          text={`${Math.round(rating * 10)}%`}
          styles={{
            path: {
              stroke: `#21d07a`,
            },
            trail: {
              stroke: `#204529`,
            },
            background: {
              fill: `#081c22`,
            },
            text: {
              fill: `#fff`,
              fontSize: `18px`,
              fontWeight: `600`,
            },
          }}
        />
      </div>
      {"card" && <img src={img} alt="" />}
      <div className="omv__mcard-overlay">
        <div className="omv__carousel-container_tags omv__mcard-tag">
          {genre.map((x, index) => (
            <Tag key={index}>{genreList[x]}</Tag>
          ))}
        </div>

        <div>
          {[...Array(Math.floor(rating / 2))].map((x, index) => (
            <AiFillStar color="#fff" key={index} />
          ))}
          {rating / 2 - Math.floor(rating / 2) > 0.4 ? (
            <BsStarHalf color="#fff" />
          ) : (
            <></>
          )}
        </div>
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default Mcard;
