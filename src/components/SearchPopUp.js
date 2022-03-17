import * as React from "react";
import { Box, Grid, Select, MenuItem, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { search } from "../utils/searchutil";
import { TMDB_IMAGE_BASE_URL } from "../services/constants";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./styles/searchPopUp.scss";
import { Link } from "react-router-dom";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "50%",
//   bgcolor: "#111",
//   color: "#fff",
//   boxShadow: 24,
//   padding: 4,
//   borderRadius: 5,
//   maxHeight: "60%",
//   height: "60%",
//   overflow: "hidden",

//   "@media screen and (max-width: 400px)": {
//     "&": {
//       width: "80%",
//     },
//   },

//   "& .search-input": {
//     outline: "none",
//     padding: "10px",
//     height: "20px",
//     border: "none",
//     marginBottom: "10px",
//     borderRadius: "5px",
//     width: "95%",
//     fontSize: "1rem",
//   },

//   "& .select-input": {
//     width: "100%",
//     bgcolor: "#fff",
//     outline: "none",
//     height: "40px",
//     borderRadius: "5px",
//   },

//   "& .result-div": {
//     overflowY: "scroll",
//     height: "90%",
//     marginTop: "5px",
//     "::-webkit-scrollbar": {
//       width: "10px",
//     },
//     "::-webkit-scrollbar-track": {
//       background: "#1a1a1a",
//     },
//     "::-webkit-scrollbar-thumb": {
//       background: "#a90000",
//       borderRadius: "10px",
//     },
//     "::-webkit-scrollbar-thumb:hover": {
//       background: "#d10000",
//     },

//     "& > li": {
//       listStyle: "none",
//       marginLeft: "0px",
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "flex-start",
//       alignItems: "center",
//       marginBottom: "10px",

//       "& > div": {
//         marginLeft: "10px",

//         "& > div": {
//           display: "flex",
//           flexDirection: "row",

//           "& > p": {
//             marginRight: "10px",
//           },
//         },
//       },
//     },
//   },
// };

export default function SearchPopUp({ showSearchScreen, setShowSearchScreen }) {
  const [searchText, setSearchText] = React.useState("");
  const [selectCategory, setSelectCategory] = React.useState("tv");
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState(null);

  const searchHandler = async (category, value) => {
    setIsLoading(true);
    // const res = await axios(
    const res = await search(
      `https://api.themoviedb.org/3/search/${category}?query=${value}&api_key=b48428df65d8cc996fa4a223b286ce42`
    );
    const movies = res;
    setMovies(movies);
    console.log(movies);
    setIsLoading(false);
  };

  const onChangeHandler = async (e) => {
    searchHandler(selectCategory, e.target.value);
    setSearchText(e.target.value);
  };

  const selectHandleChange = (e) => {
    searchHandler(e.target.value, searchText);
    setSelectCategory(e.target.value);
  };

  return (
    <div>
      <Modal
        open={showSearchScreen}
        onClose={() => setShowSearchScreen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box">
          <Grid container spacing={2}>
            <Grid item lg={9} md={9} sm={9}>
              <input
                type="text"
                placeholder="Search"
                name="searchText"
                value={searchText}
                onChange={onChangeHandler}
                className="search-input"
              />
            </Grid>
            <Grid item lg={3} md={9} sm={3}>
              <Select
                value={selectCategory}
                // label="category"
                onChange={selectHandleChange}
                className="select-input"
              >
                <MenuItem value={"tv"}>Tv Show</MenuItem>
                <MenuItem value={"movie"}>Movie</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Box
            className="result-div"
            style={{
              overflowY: !isLoading && movies?.length > 0 ? "scroll" : "hidden",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <CircularProgress sx={{ color: "red" }} />
              </div>
            ) : movies?.length > 0 ? (
              movies?.map((movie) => (
                <Link
                  to={`/${
                    selectCategory === "tv" ? "tvshow" : "movie"
                  }/details/${movie.id}`}
                  key={movie.id}
                >
                  <li>
                    <img
                      src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                      alt=""
                      width={50}
                      height={60}
                    />
                    <div>
                      <p>
                        {movie.original_title ||
                          movie.title ||
                          movie.original_name ||
                          movie.name}
                      </p>
                      <div className="list-detail">
                        <p>{movie.release_date}</p>
                        <p>
                          <StarRateIcon
                            sx={{
                              fontSize: "1rem",
                              marginRight: "2px",
                              color: "yellow",
                            }}
                          />
                          {movie.vote_average} /10
                        </p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <p>No search result</p>
              </div>
            )}
          </Box>
        </div>
      </Modal>
    </div>
  );
}
