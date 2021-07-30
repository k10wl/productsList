import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import CommentCard from "./CommentCard";

const CommentsList = ({ comments, forceUpdate }) => {
  const commentsByDate = [...comments].reverse();
  const removeComment = (commentInfo) => {
    const newComments = comments.filter(
      (comment) => comment.id !== commentInfo.commentId
    );
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: newComments }),
    };
    fetch(
      `http://localhost:3004/products/${comments[0]?.productId}`,
      requestOptions
    ).then(() => forceUpdate());
  };
  return (
    <Grid>
      {commentsByDate.map((info) => (
        <CommentCard
          key={info.id}
          productId={info.productId}
          commentId={info.id}
          comment={info.description}
          date={info.date}
          removeComment={(e) => removeComment(e)}
        />
      ))}
    </Grid>
  );
};

export default CommentsList;

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      productId: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  forceUpdate: PropTypes.func.isRequired,
};
