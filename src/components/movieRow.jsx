import React, { useEffect, useState } from "react";
import { getMovieRows } from "../services/movies";
import { TMDB_IMAGE_BASE_URL } from "../constants";
import "./styles/movieRow.scss";

function MovieRow({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getMovieRows(fetchUrl);
      setMovies(response?.data?.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies?.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                src={`${TMDB_IMAGE_BASE_URL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default MovieRow;
