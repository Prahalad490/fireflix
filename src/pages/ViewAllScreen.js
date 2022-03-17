import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getMovieRows } from "../services/movies";
import { TMDB_IMAGE_BASE_URL, TMDB_ENDPOINTS } from "../services/constants";
import "./styles/viewAllScreen.scss";
import { NavBar, Loader, MovieRow } from "../components/index";
import {
  Button,
  Menu,
  MenuItem,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

function ViewAllScreen() {
  const { state } = useLocation();
  const { title, fetchUrl } = state;

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getMovieRows(fetchUrl);
      setData(response?.data?.results);
      console.log(response?.data?.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div>
      <NavBar />
      <h1>{title}</h1>
      <Grid container spacing={2}>
        {data?.map((item) => (
          <Grid item lg={2} md={3} sm={4} xs={12}>
            {/* <Link to={`/${category}/details/${movie.id}`} key={movie.id}>
                <img
                  className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                  src={`${TMDB_IMAGE_BASE_URL}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
                {!isLargeRow && (
                  <>
                    <p>{movie.title || movie.original_name || movie.name}</p>
                    <p>{movie.release_date?.substring(0, 4)}</p>
                  </>
                )}
              </Link> */}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ViewAllScreen;
