import React from "react";
import "./home.css";
import { Carousel } from "../../components";
import { Section } from "../../containers";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState({
    trendingM: [],
    trendingT: [],
    upcomingM: [],
    releaseM: [],
    releaseT: [],
    ratedM: [],
    recommendations: [],
  });

  useEffect(() => {
    API.get("/movie/popular")
      .then((res) => {
        setData({ ...data, trendingM: res.data.results });
      })
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    API.get("/tv/popular").then((res) => {
      setData({ ...data, trendingT: res.data.results });
    });
    // eslint-disable-next-line
  }, []);

useEffect(() => {
    API.get("/movie/upcoming").then((res) => {
      setData({ ...data, upcomingM: res.data.results });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
      <Section title="Upcoming Movies" data={data.upcomingM} />
    </div>
  );
};

export default Home;
