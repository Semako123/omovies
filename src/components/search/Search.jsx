import React from "react";
import "./search.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, TextField, IconButton } from "@mui/material";
import { Details } from "../../containers";
import Popup from "reactjs-popup";

const Search = () => {
  const [q, setq] = useState("");
  const [x, setx] = useState({});
  const [data, setData] = useState([]);
  const defaultProps = {
    options: data,
    getOptionLabel: (option) =>
      option.title || option.name || option.original_name,
  };

  const updateQ = (e) => {
    setq(e.target.value);
  };

  const handleSubmit = () => {
    for (let i in data) {
      if (q === data[i].title || data[i].name) {
        if (data[i].id) {
          setx(data[i]);
        }
      }
    }
  };
  useEffect(() => {
    if (q) {
      API.get("/search/multi").then((res) => {
        setData(res.data.results);
      });
    }
  }, [q]);

  useEffect(() => {
    handleSubmit();
  }, [data, q]);

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
      query: q,
    },
  });

  return (
    <div className="omv__search">
      <Autocomplete
        {...defaultProps}
        autoComplete
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Movies"
            variant="standard"
            value={q}
            onChange={updateQ}
            onBlur={updateQ}
            style={{ width: "80vw" }}
          />
        )}
      />
      <Popup
        key={x.poster_path}
        trigger={
          <IconButton
            size="small"
            aria-label="search"
            color="inherit"
            sx={{ mb: -0.4 }}
          >
            <SearchIcon />
          </IconButton>
        }
        modal
      >
        {(close) => (
          <>
            <button className="omv__close-button" onClick={close}>
              &times;
            </button>
            <Details id={x.id} type={x.media_type} />
          </>
        )}
      </Popup>
    </div>
  );
};

export default Search;
