import { observer } from 'mobx-react-lite';
import React, { FC, memo } from 'react';
import { Box } from '../../../components/Box';
import { Sprite } from '../../../components/Sprite';
import {
  addCoordinatesAndVector,
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
import { useGame } from '../../../components/StoreContext';

const BasicPillView: FC<{ position: ScreenCoordinates }> = ({ position }) => (
  <Sprite x={position.x - 10} y={position.y - 10} name="basic-pill" />
);

const EnergizerView: FC<{ position: ScreenCoordinates }> = ({ position }) => (
  <Sprite x={position.x - 10} y={position.y - 10} name="energizer" />
);

export const BasicPillHitBox: FC = () => {
  const rect = getPillHitBox({ x: 1, y: 3 }, BASIC_PILL_ID);
  return <Box rect={rect} color="blue" />;
};

const PillView = observer<{ tile: TileCoordinates }>(
  ({ tile }: { tile: TileCoordinates }) => {
    const game = useGame();
    const { x, y } = tile;
    const tileId = game.maze.pills[y][x];
    if (tileId === BASIC_PILL_ID) {
      return (
        <BasicPillView
          position={addCoordinatesAndVector(
            screenFromTile(tile),
            SCREEN_TILE_CENTER_VECTOR
          )}
        />
      );
    }
    if (tileId === ENERGIZER_ID) {
      return (
        <EnergizerView
          position={addCoordinatesAndVector(
            screenFromTile(tile),
            SCREEN_TILE_CENTER_VECTOR
          )}
        />
      );
    }
    return null;
  }
);

// Performance tricks used here:
// Make each PillView an observer, so that we don't have to rerender PillsView.
// Make PillsView a React.memo to prevent any rerenders.
// Also: Create PillView only for those coordinates where there is a pill on first render.
export const PillsView: FC = memo(() => {
  const game = useGame();

  return (
    <>
      {Array.from({ length: MAZE_HEIGHT_IN_TILES }).map((_, y) =>
        Array.from({ length: MAZE_WIDTH_IN_TILES }).map((_, x) => {
          const pillFound = game.maze.pills[y][x] !== EMPTY_TILE_ID;
          return pillFound && <PillView key={`${x}/${y}`} tile={{ x, y }} />;
        })
      )}
    </>
  );
});

PillsView.displayName = 'displayName';
