import React from "react";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import { FormatListNumbered } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import propTypes from "prop-types";
import useStyles from "../../../materialStyles";

const SortButtons = ({ sortByName, sortByQuantity }) => {
  const classes = useStyles();
  return (
    <div className={classes.sortContainer}>
      <Grid container direction="column" alignItems="flex-end">
        <Tooltip title="Sort by name" placement="left" arrow>
          <IconButton
            onClick={sortByName}
            style={{
              boxShadow: "0px 0px 7px 0px rgba(34, 60, 80, 0.75)",
              margin: "0.5rem",
            }}
            size="small"
          >
            <SortByAlphaIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sort by quantity" placement="left" arrow>
          <IconButton
            onClick={sortByQuantity}
            style={{
              boxShadow: "0px 0px 7px 0px rgba(34, 60, 80, 0.75)",
              margin: "0.5rem",
            }}
            size="small"
          >
            <FormatListNumbered color="primary" />
          </IconButton>
        </Tooltip>
      </Grid>
    </div>
  );
};

export default SortButtons;

SortButtons.propTypes = {
  sortByName: propTypes.func.isRequired,
  sortByQuantity: propTypes.func.isRequired,
};
