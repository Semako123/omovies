import React from "react";
import "./details.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tag, Acard } from "../../components";

const Details = ({ id, type }) => {
  const [data, setData] = useState({});
  const [trailers, setTrailers] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    API.get(`/${type}/${id}`).then((res) => {
      setData(res.data);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    API.get(`/${type}/${id}/videos`).then((res) => {
      setTrailers(res.data.results);
    });
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    API.get(`/${type}/${id}/credits`).then((res) => {
      console.log(trailers);
      setCast(res.data.cast);
    });
    // eslint-disable-next-line
  }, [trailers]);

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
    <div className="omv__details scale-up-center">
      <div className="omv__details-header">
        <img
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt=""
        />
        <div className="omv__details-header_overlay">
          <div className="omv__details-header_poster">
            <img
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              alt="poster"
            />
          </div>
          <div className="omv__details-header_content">
            <h2>{data.title || data.name || data.original_title} </h2>
            <div className="omv__details-header_content-tags">
              {data.genres && data.genres.map((x) => <Tag>{x.name}</Tag>)}
            </div>
            <div className="omv__details-header_content-ratings">
              <h4>User Ratings</h4>
              <div className="omv__details-progressBar">
                <CircularProgressbar
                  backgroundPadding={5}
                  background={true}
                  value={Math.round(data.vote_average * 10)}
                  text={`${Math.round(data.vote_average * 10)}%`}
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
                      fontSize: `23px`,
                      fontWeight: `600`,
                    },
                  }}
                />
              </div>
            </div>
            <div className="omv__details-header_content-overview">
              {data.overview && (
                <>
                  <h3>Overview</h3>
                  <p>{data.overview}</p>
                </>
              )}
            </div>
            <div className="omv__details-header_content-overview">
              {data.release_date && (
                <>
                  <h3>Release Date</h3>
                  <p>{data.release_date}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="omv__details-body">
        <h2>Production Companies</h2>
        <div className="omv__details-body_companyLogos-container">
          {data.production_companies &&
            data.production_companies.map((x) => (
              <div className="omv__details-body_companyLogo-container">
                <img
                  src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
                  alt=""
                  className="omv__details-body_companyLogo"
                />
                <h5>{x.name}</h5>
              </div>
            ))}
        </div>
        <div className="omv__details-body_videos">
          {trailers && (
            <>
              <h2 style={{ marginTop: "0px" }}>Videos</h2>
              <div className="omv__details-body_trailerContainer">
                {trailers.map((x) => (
                  <iframe
                    key={x.id}
                    title={x.id}
                    id="player"
                    type="text/html"
                    className="omv__details-body_trailer"
                    src={`http://www.youtube.com/embed/${x.key}`}
                    frameborder="0"
                  ></iframe>
                ))}
              </div>
            </>
          )}

          <div className="omv__details-casts">
            <h2>Casts</h2>
            <div className="omv__details-casts_cards">
              {cast.map((x) => (
                <Acard
                  cName={x.character}
                  rName={x.name}
                  imgLink={x.profile_path}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
