import React from "react";
import { NavBar, MovieRow, Banner } from "../components/index";
import { TMDB_ENDPOINTS } from "../constants";

function HomeScreen() {
  return (
    <div>
      <NavBar />
      <Banner />
      <MovieRow
        title="Netflix Originals"
        fetchUrl={TMDB_ENDPOINTS.fetchNetflixOriginals}
        isLargeRow
      />
      <MovieRow title="Trending Now" fetchUrl={TMDB_ENDPOINTS.fetchTrending} />
      <MovieRow title="Top Rated" fetchUrl={TMDB_ENDPOINTS.fetchTopRated} />
      <MovieRow
        title="Action Movies"
        fetchUrl={TMDB_ENDPOINTS.fetchActionMovies}
      />
      <MovieRow
        title="Comedy Movies"
        fetchUrl={TMDB_ENDPOINTS.fetchComedyMovies}
      />
      <MovieRow
        title="Horror Movies"
        fetchUrl={TMDB_ENDPOINTS.fetchHorrorMovies}
      />
      <MovieRow
        title="Romance Movies"
        fetchUrl={TMDB_ENDPOINTS.fetchRomanceMovies}
      />
      <MovieRow
        title="Documentaries"
        fetchUrl={TMDB_ENDPOINTS.fetchDocumentaries}
      />
    </div>
  );
}

export default HomeScreen;
