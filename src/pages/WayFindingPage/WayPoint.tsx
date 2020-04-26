import React from 'react';
import { ScreenCoordinates, SCREEN_TILE_SIZE } from '../../model/Coordinates';
import styled from 'styled-components/macro';
import { Direction } from '../../model/Types';

const x1 = 30;
const y1 = 30;
const x2 = 70;
const y2 = 70;
const x3 = 50;
const POINTS = `${x1},${y1} ${x2},${y1} ${x3},${y2} ${x1},${y1}`;

const DirectionToAngle = {
  DOWN: 0,
  LEFT: 90,
  UP: 180,
  RIGHT: 270,
};

export const WayPoint: React.FC<{
  screenCoordinates: ScreenCoordinates;
  color: string;
  direction: Direction;
}> = ({ screenCoordinates, color, direction }) => {
  const angle = DirectionToAngle[direction];
  return (
    <SvgStyled
      viewBox="0 0 100 100"
      height="6"
      width="6"
      style={{
        left: `${screenCoordinates.x + 1}px`,
        top: `${screenCoordinates.y}px`,
      }}
    >
      <g transform={`rotate(${angle} 50 50)`}>
        <polygon points={POINTS} fill={color} stroke={color} strokeWidth={1} />
      </g>
    </SvgStyled>
  );
};

const SvgStyled = styled.svg`
  position: absolute;
  display: block;
  width: ${SCREEN_TILE_SIZE}px;
  height: ${SCREEN_TILE_SIZE}px;
  pointer-events: none;
`;
