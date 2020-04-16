/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Box } from '../../../components/Box';
import {
  screenFromTileCoordinate,
  SCREEN_TILE_CENTER,
  TileCoordinates,
  ScreenCoordinate,
} from '../../../model/Coordinates';
import { getPillHitBox } from '../../../model/detectCollisions';
import {
  BASIC_PILL_ID,
  ENERGIZER_ID,
  MAZE_HEIGHT_IN_TILES,
  MAZE_WIDTH_IN_TILES,
} from '../../../model/MazeData';
import { Sprite } from '../../../components/Sprite';
import { useGame } from './StoreContext';

const BasicPillView: FC<{ x: ScreenCoordinate; y: ScreenCoordinate }> = ({
  x,
  y,
}) => <Sprite x={x - 10} y={y - 10} name="basic-pill" />;

const EnergizerView: FC<{ x: ScreenCoordinate; y: ScreenCoordinate }> = ({
  x,
  y,
}) => <Sprite x={x - 10} y={y - 10} name="energizer" />;

export const BasicPillHitBox: FC<{}> = () => {
  const rect = getPillHitBox({ x: 1, y: 3 }, BASIC_PILL_ID);
  return <Box rect={rect} color="blue" />;
};

const PillView: FC<{ tile: TileCoordinates }> = observer(
  ({ tile }: { tile: TileCoordinates }) => {
    const store = useGame();
    const { x: tx, y: ty } = tile;
    const tileId = store.maze.pills[ty][tx];
    if (tileId === BASIC_PILL_ID) {
      return (
        <BasicPillView
          x={screenFromTileCoordinate(tx) + SCREEN_TILE_CENTER}
          y={screenFromTileCoordinate(ty) + SCREEN_TILE_CENTER}
        />
      );
    }
    if (tileId === ENERGIZER_ID) {
      return (
        <EnergizerView
          x={screenFromTileCoordinate(tx) + SCREEN_TILE_CENTER}
          y={screenFromTileCoordinate(ty) + SCREEN_TILE_CENTER}
        />
      );
    }
    return null;
  }
);

PillView.displayName = 'PillView';

export const PillsView: FC<{}> = observer(() => (
  // Performance trick used here: Make each PillView an observer, so that we minimize the number of rerenders.
  <>
    {Array.from({ length: MAZE_HEIGHT_IN_TILES }).map((_, y) =>
      Array.from({ length: MAZE_WIDTH_IN_TILES }).map((_, x) => (
        <PillView key={`${x}/${y}`} tile={{ x, y }} />
      ))
    )}
  </>
));

PillsView.displayName = 'displayName';
