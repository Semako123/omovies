import { Keyboard, Autoplay, Pagination, EffectFade } from "swiper";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import React from "react";
import "./carousel.css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Popup from "reactjs-popup";
import { Tag, Button } from "../../components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Details } from "../../containers";

const Carousel = () => {
  const [data, setData] = useState([]);

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain",
    },
  };
  const API = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    https: config,
    params: {
      api_key: "7dc7cdc0bab00a6e640b9dcea8749019",
    },
  });
  useEffect(() => {
    API.get("/trending/all/week").then((res) => {
      setData(res.data.results);
    });
    // eslint-disable-next-line
  }, []);

  const genres = useSelector((state) => state.genre);
  return (
    <>
      <Swiper
        effect="fade"
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Keyboard, Autoplay, Pagination, EffectFade]}
        keyboard={{
          enabled: true,
        }}
      >
        {data.map((data) => (
          <SwiperSlide
            className="omv__carousel-container"
            key={data.title || data.name}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              alt="slide"
            />
            <div className="omv__carousel-container_overlay">
              <div className="omv__carousel-container_tags">
                {data.genre_ids.map((x, index) => (
                  <Tag key={index}>{genres[x]}</Tag>
                ))}
              </div>

              <div className="omv__carousel-container_overlay-ratings">
                {[...Array(Math.round(data.vote_average / 2))].map((x) => (
                  <AiFillStar className="star" color="#fff" key={`${Math.random()}`} />
                ))}
                {data.vote_average / 2 - Math.floor(data.vote_average / 2) >
                0.4 ? (
                  <BsStarHalf className="star" color="#fff" />
                ) : (
                  <></>
                )}
              </div>
              <h1>{data.name || data.title}</h1>
              <p>{data.overview}</p>
              <Popup
                trigger={
                  <button className="omv__modal-button">
                    <Button type="gradient">Check now</Button>
                  </button>
                }
                modal
              >
                <Details id={data.id} type={data.media_type} />
              </Popup>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
