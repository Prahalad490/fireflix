import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { TMDB_IMAGE_BASE_URL } from "../services/constants";
import { getTvShowEpisodes } from "../services/tvShow";
import "./styles/tvShowRow.scss";

function TvShowRow({ tvShowId, noOfSeasons }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [accordionShow, setAccordionShow] = useState(true);

  const [data, setData] = useState({});
  const [selectedSeason, setSelectedSeason] = useState(1);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleclose = () => {
    setAnchorEl(null);
  };

  const handleMenuItem = (event, season) => {
    setAnchorEl(null);
    setSelectedSeason(season);
    event.stopPropagation();
  };

  const handleAccordion = () => {
    setAccordionShow(!accordionShow);
  };
  console.log(accordionShow);
  useEffect(() => {
    try {
      async function fetchData() {
        const response = await getTvShowEpisodes(tvShowId, selectedSeason);
        setData(response);
        console.log(response);
        return response;
      }
      fetchData();
    } catch (error) {
      throw error;
    }
  }, [tvShowId, selectedSeason]);

  return (
    <div className="tv-show-row">
      <Accordion
        expanded={accordionShow}
        onChange={handleAccordion}
        className="accordion-container"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderBottom: "1px solid red" }}
        >
          <Button
            variant="outlined"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleClick}
            className="tv-show-row-button"
          >
            Season {selectedSeason}
          </Button>
        </AccordionSummary>

        <AccordionDetails>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleclose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            className="tv-show-row-menu-container"
          >
            {[...Array(noOfSeasons)].map((season, index) => (
              <MenuItem
                key={index}
                onClick={(event) => handleMenuItem(event, index + 1)}
                className="tv-show-row-menu-container-item"
              >
                Season {index + 1}
              </MenuItem>
            ))}
          </Menu>
          <Grid
            container
            spacing={2}
            className="tv-show-row-grid-container"
            flexGrow={1}
          >
            {data?.episodes?.map((episode) => (
              <Grid item lg={2} md={3} sm={4} xs={12} key={episode.name}>
                <Link
                  to={`/tvshow/streaming/${tvShowId}`}
                  state={{
                    season: `${episode.season_number}`,
                    episode: `${episode.episode_number}`,
                    noOfSeasons: `${noOfSeasons}`,
                  }}
                  className="tv-show-row-link"
                >
                  <img
                    className={`row-poster`}
                    src={`${TMDB_IMAGE_BASE_URL}${episode.still_path}`}
                    alt={episode.name}
                  />
                  <p>Episode {episode.episode_number}</p>
                </Link>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TvShowRow;
