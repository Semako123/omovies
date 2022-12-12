import React from "react";
import "./section.css";
import { Mcard } from "../../components";
import { FaArrowRight } from "react-icons/fa";

const Section = ({ title, data }) => {
  return (
    <div className="omv__section section__padding">
      <h4>
        {title} <FaArrowRight className="card-icon" />
      </h4>
      <div className="omv__section-container">
        {data.map((x) => (
          <Mcard
            genre="fantasy"
            title={x.original_title}
            key={x.original_title}
            img={`https://image.tmdb.org/t/p/original/${x.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
