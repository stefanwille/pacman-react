import React from 'react';
import './WayPoint.css';
import { ScreenCoordinates } from '../../lib/Coordinates';

export const WayPoint: React.FC<{
  screenCoordinates: ScreenCoordinates;
  style?: any;
}> = ({ screenCoordinates, style }) => (
  <div
    className="WayPoint"
    style={{
      ...style,
      left: `${screenCoordinates.x - 8}px`,
      top: `${screenCoordinates.y - 8}px`,
    }}
  ></div>
);
