import React, { FC, Fragment } from 'react';
import { Direction } from './Types';
import { Sprite } from './Sprite';
import { observer } from 'mobx-react-lite';
import { Ghost, GhostDirection } from '../lib/Ghost';
import { TILE_SIZE } from '../lib/Coordinates';
import { useStore } from '../lib/StoreContext';
import { Box } from './Box';
import { WayPoints } from '../pages/WayFindingPage/WayPoints';
import { getGhostHitBox } from '../lib/detectCollisions';

export type GhostNumber = 0 | 1 | 2 | 3;
export type GhostPhase = 0 | 1;

const GHOST_WIDTH = TILE_SIZE * 2;
const GHOST_HEIGHT = TILE_SIZE * 2;

const GHOST_OFFSET_X = GHOST_WIDTH / 2 - 0;
const GHOST_OFFSET_Y = GHOST_HEIGHT / 2;

const HIT_BOX_VISIBLE = false;

export const GhostsView: FC<{}> = observer(() => {
  const store = useStore();

  return (
    <Fragment>
      {store.ghosts.map((ghost, index: number) => (
        <GhostView ghost={ghost} key={index} />
      ))}
    </Fragment>
  );
});

export const GhostView: FC<{ ghost: Ghost }> = observer(({ ghost }) => {
  const { screenCoordinates, phase, direction, ghostNumber } = ghost;
  return (
    <Fragment>
      {HIT_BOX_VISIBLE && (
        <GhostHitBox x={screenCoordinates.x} y={screenCoordinates.y} />
      )}
      <GhostSprite
        direction={direction}
        phase={phase}
        x={screenCoordinates.x - GHOST_OFFSET_X}
        y={screenCoordinates.y - GHOST_OFFSET_Y}
        ghostNumber={ghostNumber}
      />
      <WayPoints wayPoints={ghost.wayPoints ?? []} />
    </Fragment>
  );
});

type GhostProps = {
  direction: GhostDirection;
  phase: GhostPhase;
  x: number;
  y: number;
  ghostNumber: number;
  style?: { [key: string]: any };
};

export const GhostSprite: FC<GhostProps> = ({
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

export const GhostHitBox: FC<{ x: number; y: number }> = ({ x, y }) => {
  const rect = getGhostHitBox({ x, y });
  return <Box rect={rect} color="pink" />;
};

export const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];
export const GhostPhases: GhostPhase[] = [0, 1];
