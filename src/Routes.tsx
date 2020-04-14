import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { GamePage } from './pages/GamePage/GamePage';
import { MazePage } from './pages/MazePage/MazePage';
import { SpritePage } from './pages/SpritePage/SpritePage';
import { WayFindingPage } from './pages/WayFindingPage/WayFindingPage';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <GamePage />
      </Route>
      <Route path="/sprites">
        <SpritePage />
      </Route>
      <Route path="/maze">
        <MazePage />
      </Route>
      <Route path="/way-finding">
        <WayFindingPage />
      </Route>
    </Switch>
  );
};
