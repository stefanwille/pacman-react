import React from 'react';
import './Board.css';

export const Board: React.FC<{}> = ({ children }) => (
  <div className="Board">{children}</div>
);
