import React, { useEffect, useReducer } from "react";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { Card, FormControl, TextField, Typography } from "@material-ui/core";
import useStyles from "../../materialStyles";
import { clearData, setData, localReducer } from "../reactReducer";

const initialState = {
  id: "",
  name: "",
  imageUrl: "",
  count: "",
  size: {
    height: "",
    width: "",
  },
  weight: "",
  comments: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return localReducer(action, state);
    case "CLEAR_DATA":
      return initialState;
    default:
      return initialState;
  }
};

const NewProductModal = ({ openModal, closeModal, productsCount, update }) => {
  const classes = useStyles();
  const [localState, localDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localDispatch(setData("id", productsCount + 1));
  }, [productsCount]);
  const handleChange = (e) => {
    localDispatch(setData(e.target.name, e.target.value));
  };
  const addItem = (e) => {
    e.preventDefault();
    if (
      localState.imageUrl !== "" &&
      localState.name !== "" &&
      localState.count !== "" &&
      localState.width !== "" &&
      localState.height !== "" &&
      localState.weight !== ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localState),
      };
      fetch("http://localhost:3004/products", requestOptions).then(() =>
        update()
      );
      closeModal();
      localDispatch(clearData());
    }
    return false;
  };
  const cancelAddNew = (e) => {
    e.preventDefault();
    closeModal();
    localDispatch(clearData());
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Card className={classes.popupBox}>
        <form>
          <Grid container spacing={5}>
            <Grid item sm={12}>
              <Typography variant="h5" component="p" align="center">
                Insert info about new product
              </Typography>
              <FormControl fullWidth>
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="name"
                  label="Product"
                  required
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="details"
                  label="Details"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="imageUrl"
                  label="Image (url)"
                  required
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="count"
                  label="Quantity"
                  required
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="height"
                  label="Height"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="width"
                  label="Width"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="weight"
                  label="Weight"
                />
              </FormControl>
            </Grid>
            <Grid container justify="space-evenly">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => addItem(e)}
              >
                Create new product
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => cancelAddNew(e)}
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

export default NewProductModal;

NewProductModal.defaultProps = {
  openModal: false,
};

NewProductModal.propTypes = {
  openModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  productsCount: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
};
