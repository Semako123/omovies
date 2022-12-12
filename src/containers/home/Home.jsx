import React from "react";
import "./home.css";
import { Carousel } from "../../components";
import { Section } from "../../containers";
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
        API.get("/movie/recommendation").then((res) => {
          dispatch(dataActions.updateRecommendations(res.data.results));
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
      <Carousel />
      <Section title="Trending Movies" data={data.trendingM} />
      <Section title="Trending TV Shows" data={data.trendingT} />
      <Section title="Top Rated Movies" data={data.ratedM} />
      <Section title="Upcoming Movies" data={data.upcomingM} />
      <Section title="Playing Now in Theatres" data={data.playingM} />
      <Section title="Airing Today" data={data.airingT} />
      <Section title="Movie Recommendations" data={data.recommendations} />
    </div>
  );
};

export default Home;
