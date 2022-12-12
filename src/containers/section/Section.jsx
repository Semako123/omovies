import React from "react";
import "./section.css";
import { Mcard } from "../../components";
import { FaArrowDown } from "react-icons/fa";

const Section = ({ title, data }) => {
  return (
    <div className="omv__section section__padding">
      <h4>
        {title} <FaArrowDown className="card-icon" />
      </h4>
      <div className="omv__section-container">
        {data &&
          data.map((x) => (
            <Mcard
              genre={x.genre_ids.slice(0,3)}
              title={x.original_title || x.name || x.title}
              key={x.original_title || x.name || x.title}
              img={`https://image.tmdb.org/t/p/original/${x.poster_path}`}
              rating={x.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default Section;
