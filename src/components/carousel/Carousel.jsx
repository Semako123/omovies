import { Autoplay, Pagination, EffectFade } from "swiper";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import React from "react";
import "./carousel.css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Button from "../Button/Button";
import Tag from "../tag/Tag";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
      setData(res.data.results.slice(0, 10));
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
        modules={[Autoplay, Pagination, EffectFade]}
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

              <div>
                {[...Array(Math.round(data.vote_average / 2))].map((x) => (
                  <AiFillStar color="#fff" key={x} />
                ))}
                {data.vote_average / 2 - Math.floor(data.vote_average / 2) >
                0.4 ? (
                  <BsStarHalf color="#fff" />
                ) : (
                  <></>
                )}
              </div>
              <h1>{data.name || data.title}</h1>
              <p>{data.overview}</p>
              <Button type="gradient">Check now</Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
