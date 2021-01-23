import React, { FC, ComponentType } from 'react';
import 'antd/dist/antd.compact.css';

import './GlobalStyles.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { AppMenu } from './components/AppMenu';
import { Store } from './model/Store';
import { StoreProvider } from './components/StoreContext';

const App: FC<{ store?: Store; Router?: ComponentType }> = ({
  store = new Store(),
  Router = BrowserRouter,
}) => {
  return (
    <StoreProvider value={store}>
      <Router>
        <div className="App">
          <AppMenu />
          <Routes />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
