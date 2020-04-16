import React from 'react';
import { ScreenCoordinates, SCREEN_TILE_CENTER } from '../../model/Coordinates';
import styled from 'styled-components/macro';

export const WayPoint: React.FC<{
  screenCoordinates: ScreenCoordinates;
  style?: any;
}> = ({ screenCoordinates, style }) => (
  <StyledWaypoint
    style={{
      ...style,
      left: `${screenCoordinates.x + SCREEN_TILE_CENTER - 8}px`,
      top: `${screenCoordinates.y + SCREEN_TILE_CENTER - 8}px`,
    }}
  />
);

const StyledWaypoint = styled.div`
  position: relative;
  width: calc(var(--SCREEN_TILE_SIZE) / 2);
  height: calc(var(--SCREEN_TILE_SIZE) / 2);
  background-color: #e2a12b;
  position: absolute;
  transform-origin: top left;
  margin: 3.5px;
  border-radius: 4px;

  pointer-events: none;
`;
