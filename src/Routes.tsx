import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GamePage } from './pages/GamePage/GamePage';
// import { HomePage } from "./pages/HomePage/HomePage";
import { MazeTestPage } from './pages/MazeTestPage/MazeTestPage';
import { SpriteTestPage } from './pages/SpriteTestPage/SpriteTestPage';
import { WayFindingPage } from './pages/WayFindingPage/WayFindingPage';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <GamePage />
      </Route>
      <Route path="/sprites">
        <SpriteTestPage />
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
