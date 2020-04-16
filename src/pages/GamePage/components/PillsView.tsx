/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC, memo } from 'react';
import { Box } from '../../../components/Box';
import { Sprite } from '../../../components/Sprite';
import {
  addScreenAndVector,
  ScreenCoordinates,
  screenFromTile,
  SCREEN_TILE_CENTER_VECTOR,
  TileCoordinates,
} from '../../../model/Coordinates';
import { getPillHitBox } from '../../../model/detectCollisions';
import {
  BASIC_PILL_ID,
  ENERGIZER_ID,
  MAZE_HEIGHT_IN_TILES,
  MAZE_WIDTH_IN_TILES,
  EMPTY_TILE_ID,
} from '../../../model/MazeData';
import { useGame } from './StoreContext';

const BasicPillView: FC<{ position: ScreenCoordinates }> = ({ position }) => (
  <Sprite x={position.x - 10} y={position.y - 10} name="basic-pill" />
);

const EnergizerView: FC<{ position: ScreenCoordinates }> = ({ position }) => (
  <Sprite x={position.x - 10} y={position.y - 10} name="energizer" />
);

export const BasicPillHitBox: FC<{}> = () => {
  const rect = getPillHitBox({ x: 1, y: 3 }, BASIC_PILL_ID);
  return <Box rect={rect} color="blue" />;
};

const PillView: FC<{ tile: TileCoordinates }> = observer(
  ({ tile }: { tile: TileCoordinates }) => {
    const store = useGame();
    const { x, y } = tile;
    const tileId = store.maze.pills[y][x];
    if (tileId === BASIC_PILL_ID) {
      return (
        <BasicPillView
          position={addScreenAndVector(
            screenFromTile(tile),
            SCREEN_TILE_CENTER_VECTOR
          )}
        />
      );
    }
    if (tileId === ENERGIZER_ID) {
      return (
        <EnergizerView
          position={addScreenAndVector(
            screenFromTile(tile),
            SCREEN_TILE_CENTER_VECTOR
          )}
        />
      );
    }
    return null;
  }
);

PillView.displayName = 'PillView';

// Performance trick used here: Make each PillView an observer, so that we minimize the number of rerenders.
// Also make PillsView a React.memo to prevent any rerenders.
export const PillsView: FC<{}> = memo(() => {
  const store = useGame();

  return (
    <>
      {Array.from({ length: MAZE_HEIGHT_IN_TILES }).map((_, y) =>
        Array.from({ length: MAZE_WIDTH_IN_TILES }).map((_, x) => {
          const anyPillPresent = store.maze.pills[y][x] !== EMPTY_TILE_ID;
          return (
            anyPillPresent && <PillView key={`${x}/${y}`} tile={{ x, y }} />
          );
        })
      )}
    </>
  );
});

PillsView.displayName = 'displayName';
