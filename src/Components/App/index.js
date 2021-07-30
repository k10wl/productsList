/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import StartingPage from "../StartingPage";
import Details from "../Details";
import Header from "../Header";
import WrongURL from "../WrongURL";

const App = () => {
  const currentPreference = localStorage.getItem("theme");
  const setTheme = (theme) => {
    return theme === "light";
  };
  const [lightMode, setLightMode] = useState(setTheme(currentPreference));
  const updateTheme = (currentTheme) => {
    setLightMode(!lightMode);
    if (currentTheme) {
      return localStorage.setItem("theme", "dark");
    }
    return localStorage.setItem("theme", "light");
  };

  const colorScheme = createMuiTheme({
    palette: {
      type: currentPreference,
      primary: {
        main: "#4a148c",
      },
      secondary: {
        main: "#90caf9",
      },
      confirm: {
        main: "#3dc41d",
      },
      cancel: {
        main: "#c62727",
      },
    },
    props: {
      MuiTextField: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  });

  const withRoot = (Component, props) => (
    <div>
      <Header updateTheme={() => updateTheme(lightMode)} />
      <Component {...props} />
    </div>
  );
  return (
    <ThemeProvider theme={colorScheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" exact component={() => withRoot(StartingPage)} />
          <Route
            path="/products/:productId"
            exact
            render={(props) => withRoot(Details, props)}
          />
          <Route render={() => <WrongURL />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
