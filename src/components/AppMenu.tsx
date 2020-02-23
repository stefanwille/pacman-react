import 'normalize.css';
import React from 'react';
import { Link } from 'react-router-dom';
import './AppMenu.css';

export const AppMenu: React.FC = () => {
  return (
    <div className="AppMenu">
      <Link to="/">Home</Link>
      <Link to="/sprites">Sprites</Link>
      <Link to="/maze">Maze</Link>
      <Link to="/way-finding">Way Finding</Link> <br />
    </div>
  );
};
