export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const TMDB_ENDPOINTS = {
  fetchTrending: `/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=99`,
};
