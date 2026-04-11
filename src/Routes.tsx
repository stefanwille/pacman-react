import React, { Suspense } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

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
      <RouterRoutes>
        <Route path="/" element={<GamePage />} />
        <Route path="/sprites" element={<SpritePage />} />
        <Route path="/maze" element={<MazePage />} />
        <Route path="/way-finding" element={<WayFindingPage />} />
      </RouterRoutes>
    </Suspense>
  );
};
