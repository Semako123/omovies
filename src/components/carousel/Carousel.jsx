import { Autoplay, Pagination, EffectFade } from "swiper";
import { AiFillStar } from "react-icons/ai";
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

const Carousel = () => {
  const [data, setData] = useState([]);
  const list = [0, 1, 2, 3, 4];
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

  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy ",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10759: "Action & Adventure",
    10762: "Kids",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics ",
  };
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
            className="omov__carousel-container"
            key={data.title || data.name}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              alt="slide"
            />
            <div className="omov__carousel-container_overlay">
              <div className="omov__carousel-container_tags">
                {data.genre_ids.map((x) => (
                  <Tag>{genres[x]}</Tag>
                ))}
              </div>

              <div>
                {list.map((x) => (
                  <AiFillStar color="#fff" key={x} />
                ))}
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
