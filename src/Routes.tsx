import React, { Fragment } from "react";

import { Switch, Route, Link } from "react-router-dom";

import { SpriteTestPage } from "./pages/SpriteTestPage/SpriteTestPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { MazeTestPage } from "./pages/MazeTestPage";

export const Routes: React.FC = () => {
  return (
    <Fragment>
      <p style={{ textAlign: "right" }}>
        <Link to="/">Home</Link> <Link to="/sprites">Sprites</Link>{" "}
        <Link to="/maze">Maze</Link>
        <br />
      </p>

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/sprites">
          <SpriteTestPage />
        </Route>
        <Route path="/maze">
          <MazeTestPage />
        </Route>
      </Switch>
    </Fragment>
  );
};
