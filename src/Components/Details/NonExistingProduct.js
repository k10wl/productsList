import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NonExistingProduct = () => (
  <Grid container justify="center" direction="column">
    <Typography variant="h3" align="center">
      Sorry there is no such product.
    </Typography>
    <Typography variant="body1" align="center">
      It could be deleted or the ID is incorrect.
    </Typography>
    <Grid container justify="center">
      <Button component={Link} to="/" variant="contained" color="primary">
        Go home
      </Button>
    </Grid>
  </Grid>
);

export default NonExistingProduct;
