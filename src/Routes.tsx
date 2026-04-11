import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { GamePage } from './pages/GamePage/GamePage';

const MazePage = React.lazy(() =>
  import('./pages/MazePage/MazePage').then((m) => ({ default: m.MazePage }))
);
const SpritePage = React.lazy(() =>
  import('./pages/SpritePage/SpritePage').then((m) => ({
    default: m.SpritePage,
  }))
);
const WayFindingPage = React.lazy(() =>
  import('./pages/WayFindingPage/WayFindingPage').then((m) => ({
    default: m.WayFindingPage,
  }))
);

export const Routes: React.FC = () => {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
};
