import React, { FC, useEffect } from 'react';

import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { useGameStore } from '../model/store';

export const TestApp: FC<{ route?: string }> = ({
  route = '/',
}) => {
  // Reset store state before each test render
  useEffect(() => {
    useGameStore.getState().resetGame();
  }, []);

  const Router: FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  );
  return <App Router={Router} />;
};
