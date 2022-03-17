import React, { useEffect, useState } from "react";
import "./styles/banner.scss";
import { getPopularTvShows } from "../services/tvShow";
import { TMDB_IMAGE_BASE_URL } from "../services/constants";

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await getPopularTvShows();
      setMovie(
        response?.results[
          Math.floor(Math.random() * response?.results?.length - 1)
        ]
      );
      console.log(response);
      return response;
    }
    fetchData();
  }, []);

  const trimDescription = (description, length) => {
    if (description?.length > length) {
      return description.substring(0, length) + "...";
    } else {
      return description;
    }
  };
  return (
    <div>
      <header
        className="banner"
        style={{
          backgroundImage: `url("${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="banner-content">
          <h1 className="banner-title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner-buttons">
            <button className="banner-button">Play</button>
            <button className="banner-button">My List</button>
          </div>
          <h1 className="banner-desp">
            {trimDescription(movie?.overview, 150)}
          </h1>
        </div>
        <div className="banner-bottom-fade"></div>
      </header>
    </div>
  );
}

export default Banner;
