import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    cardListGridParent: {
      width: "100vw",
    },
    cardListGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, max-content))",
      gridGap: "5px",
      justifyContent: "center",
    },
    card: {
      width: "300px",
      height: "400px",
    },
    cardMedia: {
      height: "262px",
      objectFit: "contain",
    },
    cardContent: {
      padding: "8px 8px 0 !important",
      maxWidth: "284px",
    },
    cardActions: {
      width: "100%",
    },
    sortContainer: {
      position: "fixed",
      bottom: "0",
      right: "0",
    },
    detailsProduct: {
      [theme.breakpoints.up("sm")]: {
        paddingBottom: "2rem",
      },
      [theme.breakpoints.only("xs")]: {
        display: "none",
      },
    },
    detailsProductXs: {
      display: "none",
      [theme.breakpoints.only("xs")]: {
        display: "flex",
      },
    },
    detailsImg: {
      width: "100%",
      objectFit: "contain",
      [theme.breakpoints.only("xs")]: {
        width: "95vw",
        height: "100%",
        padding: "0",
      },
      [theme.breakpoints.up("md")]: {
        width: "auto",
        maxWidth: "100%",
        maxHeight: "80vh",
      },
    },
    detailsCategories: {
      position: "relative",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        "&::after": {
          flex: "1",
          content: "''",
          borderBottom: "1px #80808087 dashed",
          transform: "translateY(-50%)",
        },
      },
    },
    detailsText: {
      paddingLeft: "5px",
    },
    commentsDelete: {
      userSelect: "none",
      "&:hover": {
        cursor: "pointer",
        color: "#000",
      },
    },
    popupBox: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "50px",
    },
  })
);

export default useStyles;
