import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { GamePage } from './pages/GamePage/GamePage';
import { MazeTestPage } from './pages/MazeTestPage/MazeTestPage';
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
        <MazeTestPage />
      </Route>
      <Route path="/way-finding">
        <WayFindingPage />
      </Route>
    </Switch>
  );
};
