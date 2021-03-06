import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOneMovie } from "../services/movies";
import { TMDB_IMAGE_BASE_URL, TMDB_ENDPOINTS } from "../services/constants";
import "./styles/detailScreen.scss";
import { NavBar, Loader, MovieRow } from "../components/index";

import Grid from "@mui/material/Grid";

function MovieDetailScreen() {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [posterUrl, setPosterUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getMovie = useCallback(async () => {
    try {
      setPosterUrl("");
      setIsLoading(true);
      const response = await getOneMovie(id);
      setData(response);
      setPosterUrl(`${TMDB_IMAGE_BASE_URL}${response?.poster_path}`);
      setIsLoading(false);
      return response;
    } catch (error) {
      throw error;
    }
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="detail-screen">
      <NavBar />
      <div>
        <Grid container spacing={2} className="detail-screen-container">
          <Grid item md={4} sm={4} className="poster-grid-container">
            {data?.poster_path ? (
              <img
                className="img-poster"
                src={posterUrl}
                alt={data?.poster_path}
              />
            ) : (
              <div className="img-poster-not-available">
                <p> Not available</p>
              </div>
            )}
            <div
              className="background-overlay"
              style={{
                backgroundImage: `url("${TMDB_IMAGE_BASE_URL}${data.backdrop_path}")`,
              }}
            ></div>
          </Grid>
          <Grid item md={8} sm={8} className="detail-grid-container">
            <h1>{data?.title || data?.name || data?.original_name}</h1>
            <Grid container className="detail-grid-body-genre">
              <Grid item>
                <p style={{ borderRight: "1px solid white" }}>
                  {data?.release_date?.substring(0, 4)}{" "}
                </p>
              </Grid>
              {data?.genres?.map((genre) => (
                <Grid key={genre.id} item>
                  <p style={{ borderRight: "1px solid white" }}>{genre.name}</p>
                </Grid>
              ))}
              <Grid item>
                <p>{data?.vote_average}/100 </p>
              </Grid>
            </Grid>
            <p>{data?.overview}</p>
            <div className="detail-grid-body-buttons">
              <Link to={`/movie/streaming/${data.id}`}>
                <button>Play</button>
              </Link>
              {/* <button>Watch Trailer</button> */}
            </div>
          </Grid>
        </Grid>
      </div>
      <div>
        <MovieRow
          title="Similar Movies"
          fetchUrl={TMDB_ENDPOINTS.getSimilarMovies(id)}
          category="movie"
        />
      </div>
    </div>
  );
}

export default MovieDetailScreen;
