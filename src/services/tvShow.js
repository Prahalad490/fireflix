import axios from "./axiosInstance";
import { TMDB_ENDPOINTS } from "./constants";

export const getPopularTvShows = async () => {
  try {
    const response = await axios.get(TMDB_ENDPOINTS.fetchNetflixOriginals);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneTvShows = async (id) => {
  try {
    const response = await axios.get(TMDB_ENDPOINTS.getTvShowDetails(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTvShowEpisodes = async (id, season) => {
  try {
    const response = await axios.get(
      TMDB_ENDPOINTS.getTvShowEpisodes(id, season)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
