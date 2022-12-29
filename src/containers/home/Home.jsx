import React from "react";
import "./home.css";
import { Carousel, Search } from "../../components";
import { Section, Footer } from "../../containers";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../store/dataSlicer";

const Home = () => {
  const data = useSelector((state) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    API.get("/movie/popular")
      .then((res) => {
        dispatch(dataActions.updateTrendingM(res.data.results));
      })
      .then(() => {
        API.get("/tv/popular").then((res) => {
          dispatch(dataActions.updateTrendingT(res.data.results));
        });
      })
      .then(() => {
        API.get("/movie/upcoming").then((res) => {
          dispatch(dataActions.updateUpcomingM(res.data.results));
        });
      })
      .then(() => {
        API.get("/movie/now_playing").then((res) => {
          dispatch(dataActions.updatePlayingM(res.data.results));
        });
      })
      .then(() => {
        API.get("/tv/airing_today").then((res) => {
          dispatch(dataActions.updateAiringT(res.data.results));
        });
      })
      .then(() => {
        API.get("/movie/top_rated").then((res) => {
          dispatch(dataActions.updateRatedM(res.data.results));
        });
      }); // eslint-disable-next-line
  }, []);

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

  return (
    <div>
      <Search/>
      <Carousel />
      <Section title="Trending Movies" data={data.trendingM} type="movie" />
      <Section title="Trending TV Shows" data={data.trendingT} type="tv" />
      <Section title="Top Rated Movies" data={data.ratedM} type="movie" />
      <Section title="Upcoming Movies" data={data.upcomingM} type="movie" />
      <Section
        title="Playing Now in Theatres"
        data={data.playingM}
        type="movie"
      />
      <Section title="Airing Today" data={data.airingT} type="tv" />
      <Footer />
    </div>
  );
};

export default Home;
