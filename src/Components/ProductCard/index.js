import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CardActionArea, CardActions, IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import useStyles from "../../materialStyles";
import ModalRemoveProduct from "./ModalRemoveProduct";

const ProductCard = ({ product, update }) => {
  const { id, imageUrl, name, details, count } = product;
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Grid container direction="column">
        <Card className={classes.card}>
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ height: "100%" }}
          >
            <CardActionArea component={Link} to={`/products/${id}`}>
              <CardMedia
                component="img"
                alt={name}
                className={classes.cardMedia}
                image={imageUrl}
              />

              <CardContent className={classes.cardContent}>
                <Grid container direction="column" wrap="nowrap">
                  <Grid item>
                    <Typography variant="h4" component="h1" color="textPrimary">
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography variant="body1" color="textSecondary" noWrap>
                      {details || `n/a`}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>

              <Grid container direction="row" justify="space-between">
                <CardActions className={classes.cardActions}>
                  <Grid item xs={7}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      style={{ userSelect: "none", msUserSelect: "none" }}
                    >
                      Quantity: {count}
                    </Typography>
                  </Grid>
                  <Grid container justify="flex-end">
                    <Tooltip title="Delete product" arrow>
                      <IconButton
                        color="primary"
                        onClick={(ev) => {
                          setOpenModal(true);
                          ev.preventDefault();
                          ev.stopPropagation();
                          ev.nativeEvent.stopImmediatePropagation();
                        }}
                      >
                        <DeleteForever />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </CardActions>
              </Grid>
            </CardActionArea>
          </Grid>
        </Card>
      </Grid>

      <ModalRemoveProduct
        open={openModal}
        product={product}
        handleClose={() => {
          setOpenModal(false);
          update();
        }}
      />
    </div>
  );
};

export default ProductCard;

ProductCard.defaultProps = {
  product: {
    details: "none",
  },
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.string,
    count: PropTypes.number.isRequired,
  }),
  update: PropTypes.func.isRequired,
};
