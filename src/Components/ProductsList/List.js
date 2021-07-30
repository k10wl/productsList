import React from "react";
import ProductCard from "../ProductCard";

const List = ({ product, update }) =>
  product.map((currentProduct) => (
    <ProductCard
      key={currentProduct.id}
      product={currentProduct}
      update={update}
    />
  ));

export default List;
