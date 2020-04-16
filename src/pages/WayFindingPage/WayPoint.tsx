import React from 'react';
import { ScreenCoordinates, SCREEN_TILE_CENTER } from '../../model/Coordinates';
import styled from 'styled-components/macro';

const DOT_SIZE = 8;
const CENTER_OFFSET = SCREEN_TILE_CENTER - DOT_SIZE / 2;

export const WayPoint: React.FC<{
  screenCoordinates: ScreenCoordinates;
  color: string;
}> = ({ screenCoordinates, color }) => (
  <StyledWaypoint
    style={{
      backgroundColor: color,
      left: `${screenCoordinates.x + CENTER_OFFSET}px`,
      top: `${screenCoordinates.y + CENTER_OFFSET}px`,
    }}
  />
);

const StyledWaypoint = styled.div`
  position: absolute;
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: ${DOT_SIZE / 2}px;
  pointer-events: none;
`;
