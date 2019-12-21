import React, { Fragment } from "react";

import { Switch, Route, Link } from "react-router-dom";

import { SpriteTestPage } from "./pages/SpriteTestPage/SpriteTestPage";
import { HomePage } from "./pages/HomePage/HomePage";

export const Routes: React.FC = () => {
  return (
    <Fragment>
      <p style={{ textAlign: "right" }}>
        <Link to="/">Home</Link> <Link to="/sprites">Sprites</Link>
        <br />
      </p>

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/sprites">
          <SpriteTestPage />
        </Route>
      </Switch>
    </Fragment>
  );
};
