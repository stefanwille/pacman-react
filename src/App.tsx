import React from "react";
import PacMan from "./PacMan/pacman.png";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={PacMan} className="App-logo" alt="logo" />
      </header>
    </div>
  );
};

export default App;
