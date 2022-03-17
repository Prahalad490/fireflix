import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOneTvShows } from "../services/tvShow";
import { TMDB_IMAGE_BASE_URL, TMDB_ENDPOINTS } from "../services/constants";
import "./styles/detailScreen.scss";
import { NavBar, Loader, MovieRow, TvShowRow } from "../components/index";

import Grid from "@mui/material/Grid";

function TvshowDetailScreen() {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [posterUrl, setPosterUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getTvShow = useCallback(async () => {
    try {
      setPosterUrl("");
      setIsLoading(true);
      const response = await getOneTvShows(id);
      setData(response);
      console.log(response);
      setPosterUrl(`${TMDB_IMAGE_BASE_URL}${response?.poster_path}`);
      setIsLoading(false);
      return response;
    } catch (error) {
      throw error;
    }
  }, [id]);

  useEffect(() => {
    getTvShow();
  }, [getTvShow]);

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
            <h1>{data?.name}</h1>

            <Grid container className="detail-grid-body-genre">
              <Grid item>
                <p style={{ borderRight: "1px solid white" }}>
                  {data?.first_air_date?.substring(0, 4)}{" "}
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
              <Link
                to={`/tvshow/streaming/${data.id}`}
                state={{
                  season: `${data.last_episode_to_air.season_number}`,
                  episode: `${data.last_episode_to_air.episode_number}`,
                  noOfSeasons: `${data.number_of_seasons}`,
                }}
              >
                <button>Play</button>
              </Link>
              {/* <Link><button>Watch Trailer</button></Link> */}
            </div>
          </Grid>
        </Grid>
      </div>
      <TvShowRow tvShowId={id} noOfSeasons={data.number_of_seasons} />
      <MovieRow
        title="Similar Tv shows"
        fetchUrl={TMDB_ENDPOINTS.getSimilarTvShows(id)}
        category="tvshow"
      />
    </div>
  );
}

export default TvshowDetailScreen;
