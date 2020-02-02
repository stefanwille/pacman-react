import React from 'react';
import './WayPoint.css';

export const WayPoint: React.FC<{
  x: number;
  y: number;
  style?: any;
}> = ({ x, y, style }) => (
  <div
    className="WayPoint"
    style={{
      ...style,
      left: `${x - 8}px`,
      top: `${y - 8}px`,
    }}
  ></div>
);
