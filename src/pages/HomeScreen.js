import React from "react";
import { NavBar, MovieRow, Banner } from "../components/index";
import { TMDB_ENDPOINTS } from "../services/constants";

function HomeScreen() {
  return (
    <div>
      <NavBar />
      <Banner />
      <MovieRow
        title="Netflix Originals"
        fetchUrl={TMDB_ENDPOINTS.fetchNetflixOriginals}
        isLargeRow
        category="tvshow"
      />
      <MovieRow
        title="Trending Now"
        fetchUrl={TMDB_ENDPOINTS.fetchTrending}
        category="movie"
      />
      <MovieRow
        title="Top Rated"
        fetchUrl={TMDB_ENDPOINTS.fetchTopRated}
        category="movie"
      />
      <MovieRow
        title="Action Movies"
        fetchUrl={TMDB_ENDPOINTS.fetchActionMovies}
        category="movie"
      />
      <MovieRow
        title="Comedy Movies"
        fetchUrl={TMDB_ENDPOINTS.fetchComedyMovies}
        category="movie"
      />
      <MovieRow
        title="Horror Movies"
        fetchUrl={TMDB_ENDPOINTS.fetchHorrorMovies}
        category="movie"
      />
      <MovieRow
        title="Romance Movies"
        fetchUrl={TMDB_ENDPOINTS.fetchRomanceMovies}
        category="movie"
      />
      <MovieRow
        title="Documentaries"
        fetchUrl={TMDB_ENDPOINTS.fetchDocumentaries}
        category="movie"
      />
    </div>
  );
}

export default HomeScreen;
