import React, { FC, useState } from 'react';
import {
  SCREEN_TILE_SIZE,
  TileCoordinates,
  ScreenCoordinates,
} from '../model/Coordinates';

import './Grid.css';
import { waysMatrix, getPillsMatrix } from '../model/MazeData';

const ROWS = 31;
const COLUMNS = 28;

export const GridWithHoverCoordinates: FC<{
  screenCoordinates: ScreenCoordinates;
  onClick?: (
    coordinates: TileCoordinates,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void; // eslint-disable-next-line @typescript-eslint/no-empty-function
}> = ({ screenCoordinates, onClick }) => {
  const [coordinates, setCoordinates] = useState<TileCoordinates | null>(null);
  const pillsMatrix = getPillsMatrix();
  const { x, y } = screenCoordinates;
  return (
    <>
      <Grid x={x} y={y} onHover={setCoordinates} onClick={onClick} />
      <div
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y + ROWS * SCREEN_TILE_SIZE}px`,
          height: '20px',
        }}
      >
        {coordinates &&
          `${coordinates.x} / ${coordinates.y} - ways layer id: ${
            waysMatrix[coordinates.y][coordinates.x]
          } - pills layer id: ${
            pillsMatrix[coordinates.y][coordinates.x]
          }`}{' '}
        &nbsp;
      </div>
    </>
  );
};

export const Grid: FC<{
  x: number;
  y: number;
  onClick?: (
    coordinates: TileCoordinates,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  onHover: (coordinates: TileCoordinates | null) => void;
}> = ({ x, y, onClick, onHover }) => {
  return (
    <div
      className={'Grid'}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        gridTemplateColumns: `repeat(${COLUMNS}, ${SCREEN_TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${SCREEN_TILE_SIZE}PX)`,
      }}
    >
      {Array(ROWS)
        .fill(null)
        .map((_, rowIndex) =>
          Array.from({ length: COLUMNS }).map((_, columnIndex) => (
            <div
              className="GridCell"
              key={`${columnIndex}/${rowIndex}`}
              onClick={(
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => {
                if (onClick) {
                  onClick({ x: columnIndex, y: rowIndex }, event);
                }
              }}
              onMouseEnter={() => onHover({ x: columnIndex, y: rowIndex })}
              onMouseLeave={() => onHover(null)}
            />
          ))
        )}
    </div>
  );
};
