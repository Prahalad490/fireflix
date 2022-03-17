import React, { useEffect, useState } from "react";
import { getMovieRows } from "../services/movies";
import { TMDB_IMAGE_BASE_URL } from "../services/constants";
import "./styles/movieRow.scss";
import { Link } from "react-router-dom";

function MovieRow({ title, fetchUrl, isLargeRow = false, category }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getMovieRows(fetchUrl);
      setMovies(response?.data?.results);
      console.log(response?.data?.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <div className="row-top">
        <h2>{title}</h2>
        <Link
          to={`/${category}/view-all`}
          state={{
            title: title,
            fetchUrl: fetchUrl,
          }}
        >
          View all
        </Link>
      </div>
      <div className="row-posters">
        {movies?.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <Link to={`/${category}/details/${movie.id}`} key={movie.id}>
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
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default MovieRow;
