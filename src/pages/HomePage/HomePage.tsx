import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Pac Man</h1>
      <p>
        <Link to="/sprites">Sprites</Link>
      </p>
    </div>
  );
};
