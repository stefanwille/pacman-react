import React, { Fragment } from 'react';

import { Switch, Route, Link } from 'react-router-dom';

import { SpriteTestPage } from './pages/SpriteTestPage/SpriteTestPage';
// import { HomePage } from "./pages/HomePage/HomePage";
import { MazeTestPage } from './pages/MazeTestPage/MazeTestPage';
import { WayFindingPage } from './pages/WayFindingPage/WayFindingPage';
import { GamePage } from './pages/GamePage/GamePage';

export const Routes: React.FC = () => {
  return (
    <Fragment>
      <p style={{ textAlign: 'right' }}>
        <Link to="/">Home</Link> <Link to="/sprites">Sprites</Link>{' '}
        <Link to="/maze">Maze</Link> <Link to="/animation">Animation</Link>{' '}
        <Link to="/way-finding">Way Finding</Link>{' '}
        <Link to="/animation">Animation</Link>
        <br />
      </p>

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
        <Route path="/animation">
          <GamePage />
        </Route>
      </Switch>
    </Fragment>
  );
};
