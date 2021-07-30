import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Breadcrumbs, Button } from "@material-ui/core";
import { withRouter, Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  products: {
    backgroundColor: "#fff",
    color: "#000 !important",
  },
  active: {
    color: "rgba(255,255,255,0.75)",
    "&:hover": {
      color: "#000",
      backgroundColor: "#fff",
    },
  },
  inactive: {
    color: "#000 !important",
    backgroundColor: "#ffffff",
  },
}));

/* eslint-disable react/jsx-props-no-spreading */
const LinkRouter = (props) => (
  <Button {...props} component={RouterLink} color="secondary" />
);

const BreadcrumbsNav = ({ location: { pathname } }) => {
  let pathNames = pathname.split("/").filter((x) => x);
  pathNames = pathNames.filter((x) => x !== "products");
  const [productName, setProductName] = useState("");
  const classes = useStyles();
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (pathNames.length === 0) {
      return null;
    }
    fetch(`http://localhost:3004/products/${pathNames.slice().pop()}`)
      .then((res) => res.json())
      .then((res) => setProductName(res.name));
  }, [pathname]);
  return (
    <Breadcrumbs separator="">
      {pathNames.length !== 0 ? (
        <LinkRouter to="/" className={classes.active}>
          Product List
        </LinkRouter>
      ) : (
        <Button className={classes.products} disabled>
          Product List
        </Button>
      )}
      {pathNames.length !== 0 &&
        pathNames.map((name, index) => {
          if (productName) {
            const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
            if (pathNames.length === index + 1) {
              return (
                <Button key={name} className={classes.inactive} disabled>
                  {productName}
                </Button>
              );
            }
            return (
              <LinkRouter key={name} to={routeTo} className={classes.active}>
                {productName}
              </LinkRouter>
            );
          }
          return null;
        })}
    </Breadcrumbs>
  );
};

export default withRouter(BreadcrumbsNav);

BreadcrumbsNav.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
