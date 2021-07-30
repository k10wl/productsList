/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import * as mui from "@material-ui/core";
import useStyles from "../../../materialStyles";

const ModalRemoveProduct = ({ open, handleClose, product }) => {
  const { id, name } = product;
  const classes = useStyles();

  return (
    <mui.Modal open={open} onClose={handleClose}>
      <mui.Grid>
        <mui.Card className={classes.popupBox}>
          <mui.Grid container direction="column" alignItems="center">
            <mui.Typography>Permanently delete {name}?</mui.Typography>
            <mui.Grid container direction="row" justify="space-around">
              <mui.Button
                color="primary"
                onClick={() => {
                  fetch(`http://localhost:3004/products/${id}`, {
                    method: "DELETE",
                  }).then(() => handleClose());
                }}
              >
                Confirm
              </mui.Button>
              <mui.Button onClick={() => handleClose()}>Cancel</mui.Button>
            </mui.Grid>
          </mui.Grid>
        </mui.Card>
      </mui.Grid>
    </mui.Modal>
  );
};

export default ModalRemoveProduct;

ModalRemoveProduct.defaultProps = {
  open: false,
};

ModalRemoveProduct.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
