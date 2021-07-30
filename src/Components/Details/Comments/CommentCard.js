import React from "react";
import Grid from "@material-ui/core/Grid";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "../../../materialStyles";

const CommentCard = ({
  productId,
  commentId,
  comment,
  date,
  removeComment,
}) => {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Box width="75%" style={{ margin: "1rem 0" }}>
        <Grid container direction="column">
          <Typography color="textSecondary" variant="body2">
            {date}
          </Typography>
          <Typography>{comment}</Typography>
          <Grid item>
            <Typography
              variant="body2"
              component="span"
              color="textSecondary"
              onClick={() => removeComment({ productId, commentId })}
              className={classes.commentsDelete}
              noWrap
            >
              Delete
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default CommentCard;

CommentCard.propTypes = {
  productId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  removeComment: PropTypes.func.isRequired,
};
