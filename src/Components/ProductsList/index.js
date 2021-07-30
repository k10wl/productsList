import React, { useEffect, useState } from "react";
import { Card, CardActionArea, Typography } from "@material-ui/core";
import useStyles from "../../materialStyles";
import NewProductModal from "../NewProductModal";
import List from "./List";
import SortButtons from "./SortButtons";
import sortByQuantity from "./SortButtons/sortByQuantity";
import sortByName from "./SortButtons/sortByName";

// eslint-disable-next-line consistent-return
const ProductsList = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [update, forceUpdate] = useState(false);
  const [sortByNameDep, triggerSortByName] = useState(false);
  const [sortByQuantityDep, triggerSortByQuantity] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    setIsLoaded(false);
    fetch("http://localhost:3004/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setIsLoaded(true);
      });
  }, [update]);
  useEffect(() => {
    setProducts(sortByName(products));
  }, [sortByNameDep]);
  useEffect(() => {
    setProducts(sortByQuantity(products));
  }, [sortByQuantityDep]);
  return (
    <div className={classes.cardListGridParent}>
      <div className={classes.cardListGrid}>
        {!isLoaded ? (
          <Typography>Loading</Typography>
        ) : (
          <List product={products} update={() => forceUpdate(!update)} />
        )}
        <Card className={classes.card}>
          <CardActionArea
            style={{ height: "100%", backgroundColor: "#3f51b5" }}
            onClick={() => setDisplayModal(true)}
          >
            <Typography
              align="center"
              style={{
                color: "#fff",
                fontSize: "15rem",
                lineHeight: "12rem",
              }}
            >
              +
            </Typography>
            <Typography variant="h4" align="center" style={{ color: "#fff" }}>
              Add new product
            </Typography>
          </CardActionArea>
        </Card>
      </div>

      <NewProductModal
        openModal={displayModal}
        closeModal={() => setDisplayModal(false)}
        productsCount={products.length}
        update={() => forceUpdate(!update)}
      />

      <SortButtons
        sortByName={() => triggerSortByName(!sortByNameDep)}
        sortByQuantity={() => triggerSortByQuantity(!sortByQuantityDep)}
      />
    </div>
  );
};

export default ProductsList;
