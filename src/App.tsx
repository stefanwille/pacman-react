import React from 'react';
import 'normalize.css';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes';
import { AppMenu } from './components/AppMenu';

const App: React.FC = () => {
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
