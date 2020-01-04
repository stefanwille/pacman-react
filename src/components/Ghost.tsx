import React, { FC } from 'react';
import { Direction } from './Types';
import { Sprite } from './Sprite';
import { observer } from 'mobx-react-lite';
import { GhostStore } from '../lib/GhostStore';
import { TILE_SIZE, screenFromTileCoordinate } from '../lib/Coordinates';
import { useStore } from '../lib/StoreContext';
import { getGhostHitBox } from '../lib/onTimeElapsed';
import { Box } from './Box';

export type GhostNumber = 0 | 1 | 2 | 3;
export type GhostPhase = 0 | 1;

const GHOST_WIDTH = TILE_SIZE * 2;
const GHOST_HEIGHT = TILE_SIZE * 2;

const GHOST_OFFSET_X = GHOST_WIDTH / 2 - 3;
const GHOST_OFFSET_Y = GHOST_HEIGHT / 2;

export const GhostView: FC<{ ghostNumber: number }> = observer(
  ({ ghostNumber }) => {
    const store = useStore();
    const ghostStore: GhostStore = store.ghosts[ghostNumber];
    return (
      <Ghost
        direction={ghostStore.direction}
        phase={ghostStore.phase}
        x={ghostStore.x - GHOST_OFFSET_X}
        y={ghostStore.y - GHOST_OFFSET_Y}
        ghostNumber={ghostStore.ghostNumber}
      />
    );
  }
);

type GhostProps = {
  direction: Direction;
  phase: GhostPhase;
  x: number;
  y: number;
  ghostNumber: number;
  style?: { [key: string]: any };
};

export const Ghost: FC<GhostProps> = ({
  direction,
  phase,
  x,
  y,
  ghostNumber,
  style,
}) => (
  <Sprite
    className="Sprite-ghost"
    name={`ghost-${ghostNumber}-direction-${direction}-phase-${phase}`}
    x={x}
    y={y}
    style={style}
  />
);

export const GhostHitBox: FC<{}> = () => {
  const rect = getGhostHitBox(
    screenFromTileCoordinate(20),
    screenFromTileCoordinate(20)
  );
  return <Box rect={rect} color="pink" />;
};

export const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];
export const GhostPhases: GhostPhase[] = [0, 1];
