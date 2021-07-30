import React from "react";
import * as mui from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import BreadcrumbsNav from "./BreadcrumsNav";

// eslint-disable-next-line react/prop-types
const Header = ({ updateTheme }) => {
  const light = () => {
    return localStorage.theme === "light";
  };
  return (
    <div>
      <mui.AppBar position="fixed" color="primary">
        <mui.Toolbar color="primary">
          <mui.Grid container justify="space-between" alignItems="center">
            <mui.Grid container item xs={8}>
              <BreadcrumbsNav />
            </mui.Grid>
            <mui.Grid container item xs={4} justify="flex-end">
              <mui.IconButton onClick={() => updateTheme()}>
                {light() ? (
                  <Brightness7Icon fontSize="large" style={{ color: "#fff" }} />
                ) : (
                  <Brightness4Icon fontSize="large" style={{ color: "#fff" }} />
                )}
              </mui.IconButton>
              <form action="https://github.com/k10wl">
                <mui.IconButton type="submit" style={{ color: "#fff" }}>
                  <GitHubIcon fontSize="large" />
                </mui.IconButton>
              </form>
            </mui.Grid>
          </mui.Grid>
        </mui.Toolbar>
      </mui.AppBar>
      <mui.Toolbar style={{ marginBottom: "1rem" }} />
    </div>
  );
};

export default Header;
