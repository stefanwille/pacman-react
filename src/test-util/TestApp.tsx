import React, { FC } from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Store } from '../model/Store';
import App from '../App';

export const TestApp: FC<{ store?: Store; route?: string }> = ({
  store = new Store(),
  route = '/',
}) => {
  const Router: FC<{}> = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  );
  return <App store={store} Router={Router} />;
};
