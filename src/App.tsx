import React, { FC, ComponentType } from 'react';
import 'antd/dist/antd.compact.css';

import './GlobalStyles.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { AppMenu } from './components/AppMenu';

const App: FC<{ Router?: ComponentType }> = ({
  Router = BrowserRouter,
}) => {
  return (
    <Router>
      <div className="App">
        <AppMenu />
        <Routes />
      </div>
    </Router>
  );
};

export default App;
