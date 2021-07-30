import React, { useReducer } from "react";
import { Button, Card, FormControl, Modal, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../materialStyles";
import * as reactReducer from "../../reactReducer";

const EditModal = ({ openEdit, closeEdit, currentProduct, forceUpdate }) => {
  const classes = useStyles();
  const { details, size, weight, count } = currentProduct;
  const { height, width } = size;
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DATA":
        return reactReducer.localReducer(action, state);
      case "CLEAR_DATA":
        return currentProduct;
      default:
        return currentProduct;
    }
  };

  const [localState, localDispatch] = useReducer(reducer, currentProduct);
  const handleChange = (e) => {
    localDispatch(reactReducer.setData(e.target.name, e.target.value));
  };

  const saveEdit = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(localState),
    };
    fetch(
      `http://localhost:3004/products/${currentProduct.id}`,
      requestOptions
    ).then(() => forceUpdate());
    reactReducer.clearData();
    closeEdit();
  };
  const cancelEdit = () => {
    reactReducer.clearData();
    closeEdit();
  };
  return (
    <Modal open={openEdit} onClose={closeEdit}>
      <Card className={classes.popupBox}>
        <form>
          <Grid container spacing={5}>
            <Grid item sm={12}>
              <Typography variant="h5" component="p" align="center">
                Edit product
              </Typography>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => handleChange(e)}
                  defaultValue={details}
                  name="details"
                  label="Details:"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  defaultValue={height}
                  name="height"
                  label="Height:"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  defaultValue={width}
                  name="width"
                  label="Width:"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  defaultValue={weight}
                  name="weight"
                  label="Weight:"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  defaultValue={count}
                  name="count"
                  label="Quantity:"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" justify="space-evenly">
              <Button
                variant="contained"
                color="primary"
                onClick={() => saveEdit()}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => cancelEdit()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Modal>
  );
};

export default EditModal;

EditModal.defaultProps = {
  openEdit: false,
  currentProduct: {
    imageUrl: "",
    details: "n/a",
    count: 0,
    size: {
      width: 0,
      height: 0,
    },
    weight: "n/a",
  },
};

EditModal.propTypes = {
  openEdit: PropTypes.bool,
  closeEdit: PropTypes.func.isRequired,
  currentProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    details: PropTypes.string,
    count: PropTypes.number,
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    weight: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.any),
  }),
  forceUpdate: PropTypes.func.isRequired,
};
