import React from "react";

import { Switch, Route } from "react-router-dom";

import { SpriteTestPage } from "./pages/SpriteTestPage/SpriteTestPage";
import { HomePage } from "./pages/HomePage/HomePage";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/sprites">
        <SpriteTestPage />
      </Route>
    </Switch>
  );
};
