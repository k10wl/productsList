import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import * as mui from "@material-ui/core";
import CommentsContainer from "./Comments/CommentsContainer";
import EditModal from "./EditModal";
import useStyles from "../../materialStyles";
import NonExistingProduct from "./NonExistingProduct";

const Details = ({ match: { params } }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [update, forceUpdate] = useState(false);
  const classes = useStyles();

  const history = useHistory();
  const EscToMain = (e) => {
    if (e.key === "Escape") {
      history.push("/");
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", EscToMain);
    return () => document.removeEventListener("keydown", EscToMain);
  }, []);

  const { productId } = params;
  useEffect(() => {
    fetch(`http://localhost:3004/products/${productId}`)
      .then((res) => res.json())
      .then((res) => {
        setProductDetails(res);
        setIsLoaded(true);
      });
  }, [update]);
  if (!isLoaded) {
    return <h1>loading...</h1>;
  }
  if (!productDetails.id) {
    return <NonExistingProduct />;
  }
  const { imageUrl, name, details, count, size, weight } = productDetails;
  const { height, width } = size;
  return (
    <div>
      <mui.Grid container justify="center" direction="row">
        <mui.Box className={classes.detailsProductXs}>
          <mui.Typography variant="h3" align="center">
            {name}
          </mui.Typography>
          <mui.Tooltip title="Edit product" arrow>
            <mui.IconButton onClick={() => setOpenEdit(true)}>
              <EditIcon />
            </mui.IconButton>
          </mui.Tooltip>
        </mui.Box>
        <mui.Grid
          item
          sm={5}
          style={{ padding: "0" }}
          container
          justify="center"
        >
          <img alt={name} src={imageUrl} className={classes.detailsImg} />
        </mui.Grid>
        <mui.Grid
          item
          sm={7}
          container
          direction="column"
          justify="space-between"
        >
          <mui.Grid>
            <mui.Grid
              container
              direction="row"
              alignItems="center"
              className={classes.detailsProduct}
            >
              <mui.Typography variant="h3">{name}</mui.Typography>
              <mui.Tooltip title="Edit product" arrow>
                <mui.IconButton onClick={() => setOpenEdit(true)}>
                  <EditIcon />
                </mui.IconButton>
              </mui.Tooltip>
            </mui.Grid>

            <mui.Grid container item direction="column">
              <mui.Grid container direction="row">
                <mui.Grid item sm={5}>
                  <mui.Typography className={classes.detailsCategories}>
                    Details:
                  </mui.Typography>
                </mui.Grid>
                <mui.Grid item sm={7}>
                  <mui.Typography className={classes.detailsText}>
                    {details || "n/a"}
                  </mui.Typography>
                </mui.Grid>
              </mui.Grid>
              <mui.Grid container direction="row">
                <mui.Grid item sm={5}>
                  <mui.Typography className={classes.detailsCategories}>
                    Height:
                  </mui.Typography>
                </mui.Grid>
                <mui.Grid item sm={7}>
                  <mui.Typography className={classes.detailsText}>
                    {height}
                  </mui.Typography>
                </mui.Grid>
              </mui.Grid>
              <mui.Grid container direction="row">
                <mui.Grid item sm={5}>
                  <mui.Typography className={classes.detailsCategories}>
                    Width:
                  </mui.Typography>
                </mui.Grid>
                <mui.Grid item sm={7}>
                  <mui.Typography className={classes.detailsText}>
                    {width}
                  </mui.Typography>
                </mui.Grid>
              </mui.Grid>
              <mui.Grid container direction="row">
                <mui.Grid item sm={5}>
                  <mui.Typography className={classes.detailsCategories}>
                    Weight:
                  </mui.Typography>
                </mui.Grid>
                <mui.Grid item sm={7}>
                  <mui.Typography className={classes.detailsText}>
                    {weight}
                  </mui.Typography>
                </mui.Grid>
              </mui.Grid>
              <mui.Grid container direction="row">
                <mui.Grid item sm={5}>
                  <mui.Typography className={classes.detailsCategories}>
                    Quantity:
                  </mui.Typography>
                </mui.Grid>
                <mui.Grid item sm={7}>
                  <mui.Typography className={classes.detailsText}>
                    {count}
                  </mui.Typography>
                </mui.Grid>
              </mui.Grid>
            </mui.Grid>
          </mui.Grid>
        </mui.Grid>
      </mui.Grid>

      <mui.Grid container item xs={12} justify="center">
        <CommentsContainer product={productDetails} />
      </mui.Grid>

      <EditModal
        openEdit={openEdit}
        closeEdit={() => setOpenEdit(false)}
        currentProduct={productDetails}
        forceUpdate={() => forceUpdate(!update)}
      />
    </div>
  );
};

export default Details;

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
