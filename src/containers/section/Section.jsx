import React from "react";
import "./section.css";
import { Mcard } from "../../components";
import { FaArrowDown } from "react-icons/fa";
import Popup from "reactjs-popup";
import Details from "../detail/Details";

const Section = ({ title, data, type }) => {
  return (
    <div className="omv__section section__padding">
      <h4>
        {title} <FaArrowDown className="card-icon" />
      </h4>
      <div className="omv__section-container">
        {data &&
          data.slice(0, 18).map((x) => (
            <Popup
              key={x.poster_path}
              trigger={
                <button className="omv__modal-button">
                  <Mcard
                    genre={x.genre_ids.slice(0, 3)}
                    title={x.original_title || x.name || x.title}
                    key={x.original_title || x.name || x.title}
                    img={`https://image.tmdb.org/t/p/original/${x.poster_path}`}
                    rating={x.vote_average}
                  />
                </button>
              }
              modal
            >
              {(close) => (
                <>
                  <button className="omv__close-button" onClick={close}> &times;</button>
                  <Details id={x.id} type={type} />
                </>
              )}
            </Popup>
          ))}
      </div>
    </div>
  );
};

export default Section;
