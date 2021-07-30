/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CommentsList from "./CommentsList";

const CommentsContainer = ({ product }) => {
  const [comment, setComment] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [requestedComments, setCommentsArray] = useState(product.comments);
  const [update, forceUpdate] = useState(false);
  const { id: productId } = product;

  useEffect(() => {
    fetch(`http://localhost:3004/products/${productId}`)
      .then((res) => res.json())
      .then((res) => {
        setCommentsArray(res.comments);
      });
  }, [productId, update]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      const dateObj = new Date();
      const year = dateObj.getUTCFullYear();
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      const normalizeDate = (number) => {
        if (number < 10) {
          return `0${number}`;
        }
        return number;
      };
      const setDate = () =>
        `${normalizeDate(day)}.${normalizeDate(month)}.${normalizeDate(year)}`;
      const createId = () => {
        if (requestedComments.length !== 0) {
          return requestedComments.slice().pop().id + 1;
        }
        return 1;
      };

      const commentObj = {
        id: createId(),
        productId: parseInt(productId, 10),
        description: comment,
        date: setDate(),
      };
      const newComments = [...requestedComments, commentObj];

      // eslint-disable-next-line no-unused-vars
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: newComments }),
      };
      fetch(
        `http://localhost:3004/products/${productId}`,
        requestOptions
      ).then(() => forceUpdate(!update));
    }
    setComment("");
  };

  return (
    <Grid item xs={12} sm={10} md={8} lg={6}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          marginTop="1rem"
        >
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            label="Comment"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onSubmit={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </Box>
      </form>
      <CommentsList
        comments={requestedComments}
        forceUpdate={() => forceUpdate(!update)}
      />
    </Grid>
  );
};

export default CommentsContainer;

CommentsContainer.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  }).isRequired,
};
