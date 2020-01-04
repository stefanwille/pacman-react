import React, { FC } from 'react';
import { Sprite } from './Sprite';
import { Direction } from './Types';
import { observer } from 'mobx-react-lite';
import { useStore } from '../lib/StoreContext';
import { TILE_SIZE, screenFromTileCoordinate } from '../lib/Coordinates';
import { getPacManHitBox } from '../lib/onTimeElapsed';
import { Box } from './Box';

export type PacManPhase = 0 | 1 | 2;

export const PacManPhases: PacManPhase[] = [0, 1, 2];

const PAC_MAN_WIDTH = TILE_SIZE * 2;
const PAC_MAN_HEIGHT = TILE_SIZE * 2;

const PAC_MAN_OFFSET_X = PAC_MAN_WIDTH / 2 - 2;
const PAC_MAN_OFFSET_Y = PAC_MAN_HEIGHT / 2 - 2;

export const PacManView: FC<{}> = observer(() => {
  const store = useStore();
  return (
    <PacManSprite
      direction={store.pacMan.direction}
      phase={store.pacMan.phase}
      x={store.pacMan.x - PAC_MAN_OFFSET_X}
      y={store.pacMan.y - PAC_MAN_OFFSET_Y}
    />
  );
});

export const PacManSprite: FC<{
  direction: Direction;
  phase: PacManPhase;
  x: number;
  y: number;
  style?: { [key: string]: any };
}> = ({ direction, phase, x, y, style }) => {
  return (
    <Sprite
      className="Sprite-pacman"
      name={`pacman-direction-${direction}-phase-${phase}`}
      x={x}
      y={y}
      style={style}
    />
  );
};

export const PacManHitBox: FC<{}> = () => {
  const rect = getPacManHitBox(
    screenFromTileCoordinate(1),
    screenFromTileCoordinate(1)
  );
  return <Box rect={rect} color="green" />;
};
