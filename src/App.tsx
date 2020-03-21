import React from 'react';
import 'normalize.css';
import 'antd/dist/antd.css';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes';
import { AppMenu } from './components/AppMenu';
import { Store } from './lib/Store';
import { useLocalStore } from 'mobx-react-lite';
import { StoreProvider } from './components/StoreContext';

const App: React.FC = () => {
  const store = useLocalStore(() => new Store());

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
