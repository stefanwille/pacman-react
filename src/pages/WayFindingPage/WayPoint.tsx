import React from 'react';
import './WayPoint.css';
import { ScreenCoordinates, SCREEN_TILE_CENTER } from '../../lib/Coordinates';

export const WayPoint: React.FC<{
  screenCoordinates: ScreenCoordinates;
  style?: any;
}> = ({ screenCoordinates, style }) => (
  <div
    className="WayPoint"
    style={{
      ...style,
      left: `${screenCoordinates.x + SCREEN_TILE_CENTER - 8}px`,
      top: `${screenCoordinates.y + SCREEN_TILE_CENTER - 8}px`,
    }}
  ></div>
);
