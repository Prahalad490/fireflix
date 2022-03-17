import axios from "./axiosInstance";
import { TMDB_ENDPOINTS } from "./constants";

export const getMovieRows = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getViewAll = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOneMovie = async (id) => {
  try {
    const response = await axios.get(TMDB_ENDPOINTS.getMovieDetails(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};
