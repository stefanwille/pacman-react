import React from 'react';
import { ScreenCoordinates, SCREEN_TILE_CENTER } from '../../model/Coordinates';
import styled from 'styled-components/macro';

const DOT_SIZE = 8;

export const WayPoint: React.FC<{
  screenCoordinates: ScreenCoordinates;
  color: string;
}> = ({ screenCoordinates, color }) => (
  <StyledWaypoint
    style={{
      backgroundColor: color,
      left: `${screenCoordinates.x + SCREEN_TILE_CENTER - DOT_SIZE / 2}px`,
      top: `${screenCoordinates.y + SCREEN_TILE_CENTER - DOT_SIZE / 2}px`,
    }}
  />
);

const StyledWaypoint = styled.div`
  position: relative;
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  position: absolute;
  transform-origin: top left;
  border-radius: ${DOT_SIZE / 2}px;

  pointer-events: none;
`;
