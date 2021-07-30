import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const WrongURL = () => (
  <div>
    <Button component={Link} to="/">
      Go home
    </Button>
  </div>
);

export default WrongURL;
