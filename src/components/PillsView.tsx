/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Box } from '../components/Box';
import {
  screenFromTileCoordinate,
  SCREEN_TILE_CENTER,
} from '../model/Coordinates';
import { getPillHitBox } from '../model/detectCollisions';
import {
  BASIC_PILL_ID,
  ENERGIZER_ID,
  MAZE_HEIGHT_IN_TILES,
  MAZE_WIDTH_IN_TILES,
} from '../model/MazeData';
import { Sprite } from './Sprite';
import { useGame } from './StoreContext';

const BasicPillView: FC<{ x: number; y: number }> = ({ x, y }) => (
  <Sprite x={x - 10} y={y - 10} name="basic-pill" />
);

const EnergizerView: FC<{ x: number; y: number }> = ({ x, y }) => (
  <Sprite x={x - 10} y={y - 10} name="energizer" />
);

export const BasicPillHitBox: FC<{}> = () => {
  const rect = getPillHitBox({ x: 1, y: 3 }, BASIC_PILL_ID);
  return <Box rect={rect} color="blue" />;
};

export const PillsView: FC<{}> = observer(() => {
  const store = useGame();
  const views = [];
  for (let ty = 0; ty < MAZE_HEIGHT_IN_TILES; ty++) {
    for (let tx = 0; tx < MAZE_WIDTH_IN_TILES; tx++) {
      const tileId = store.maze.pills[ty][tx];
      if (tileId === BASIC_PILL_ID) {
        views.push(
          <BasicPillView
            key={`${tx}/${ty}`}
            x={screenFromTileCoordinate(tx) + SCREEN_TILE_CENTER}
            y={screenFromTileCoordinate(ty) + SCREEN_TILE_CENTER}
          />
        );
      }
      if (tileId === ENERGIZER_ID) {
        views.push(
          <EnergizerView
            key={`${tx}/${ty}`}
            x={screenFromTileCoordinate(tx) + SCREEN_TILE_CENTER}
            y={screenFromTileCoordinate(ty) + SCREEN_TILE_CENTER}
          />
        );
      }
    }
  }
  return <>{views}</>;
});
