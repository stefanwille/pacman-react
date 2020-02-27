import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { TILE_SIZE } from '../lib/Coordinates';
import { getGhostHitBox } from '../lib/detectCollisions';
import { Ghost, GhostAnimationPhase } from '../lib/Ghost';
import { Direction } from '../lib/Types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WayPoints } from '../pages/WayFindingPage/WayPoints';
import { Box } from './Box';
import { Sprite } from './Sprite';
import { useStore } from './StoreContext';
import { Target } from './Target';

const GHOST_WIDTH = TILE_SIZE * 2;
const GHOST_HEIGHT = TILE_SIZE * 2;

const GHOST_OFFSET_X = GHOST_WIDTH / 2 - 0;
const GHOST_OFFSET_Y = GHOST_HEIGHT / 2;

const HIT_BOX_VISIBLE = false;

export const GhostsView: FC<{}> = observer(() => {
  const store = useStore();

  return (
    <>
      {store.ghosts.map((ghost, index: number) => (
        <GhostView ghost={ghost} key={ghost.ghostNumber} />
      ))}
    </>
  );
});

export const GhostView: FC<{ ghost: Ghost }> = observer(({ ghost }) => {
  const {
    screenCoordinates,
    animationPhase: phase,
    direction,
    ghostNumber,
  } = ghost;
  return (
    <>
      {HIT_BOX_VISIBLE && (
        <GhostHitBox x={screenCoordinates.x} y={screenCoordinates.y} />
      )}
      <GhostSprite
        direction={direction}
        ghostAnimationPhase={phase}
        x={screenCoordinates.x - GHOST_OFFSET_X}
        y={screenCoordinates.y - GHOST_OFFSET_Y}
        ghostNumber={ghostNumber}
      />
      {/* <WayPoints wayPoints={ghost.wayPoints ?? []} /> */}
      <Target tile={ghost.targetTile} color={ghost.colorCode} />
    </>
  );
});

type GhostProps = {
  direction: Direction;
  ghostAnimationPhase: GhostAnimationPhase;
  x: number;
  y: number;
  ghostNumber: number;
  style?: { [key: string]: any };
};

export const GhostSprite: FC<GhostProps> = ({
  direction,
  ghostAnimationPhase: phase,
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
