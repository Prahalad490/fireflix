import React from "react";
import { NavBar, MovieRow, TvShowRow } from "../components/index";
import { useParams, useLocation } from "react-router-dom";
import { TMDB_ENDPOINTS } from "../services/constants";

function StreamScreen() {
  const { id, category } = useParams();
  const { state } = useLocation();

  console.log(state, id);

  function setUrl(id, category) {
    if (category === "movie") {
      return `${process.env.REACT_APP_STREAM_BASE_URL_MOVIE}${id}`;
    } else {
      return `${process.env.REACT_APP_STREAM_BASE_URL_TV}${id}-${state.season}-${state.episode}`;
    }
  }
  return (
    <div>
      <NavBar />
      <div style={{ height: "80vh", width: "100%", padding: "60px 0" }}>
        <iframe
          title="streaming"
          src={setUrl(id, category)}
          width="100%"
          height="100%"
          allowFullScreen
          style={{ border: "none" }}
        />
      </div>
      {category !== "movie" && (
        <TvShowRow tvShowId={id} noOfSeasons={state.noOfSeasons} />
      )}
      <MovieRow
        title={category === "movie" ? "Similar Movies" : "Similar Tv shows"}
        fetchUrl={
          category === "movie"
            ? TMDB_ENDPOINTS.getSimilarMovies(id)
            : TMDB_ENDPOINTS.getSimilarTvShows(id)
        }
        category={category === "movie" ? "movie" : "tvshow"}
      />
    </div>
  );
}

export default StreamScreen;
