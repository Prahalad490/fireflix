import axios from "./axiosInstance";
import { TMDB_ENDPOINTS } from "../constants";

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(TMDB_ENDPOINTS.fetchNetflixOriginals);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMovieRows = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};
