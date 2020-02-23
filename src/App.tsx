import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'normalize.css';
import 'tailwindcss/dist/base.css';
import 'tailwindcss/dist/components.css';
import 'tailwindcss/dist/utilities.css';

import './App.css';
import { Routes } from './Routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
