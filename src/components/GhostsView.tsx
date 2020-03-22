import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { SCREEN_TILE_SIZE } from '../lib/Coordinates';
import { getGhostHitBox } from '../lib/detectCollisions';
import { Ghost, GhostAnimationPhase, FrightenedGhostTime } from '../lib/Ghost';
import { Direction } from '../lib/Types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WayPoints } from '../pages/WayFindingPage/WayPoints';
import { Box } from './Box';
import { Sprite } from './Sprite';
import { useGame } from './StoreContext';
import { Target } from './Target';

const GHOST_WIDTH = SCREEN_TILE_SIZE * 2;
const GHOST_HEIGHT = SCREEN_TILE_SIZE * 2;

const GHOST_OFFSET_X = GHOST_WIDTH / 2 - 0;
const GHOST_OFFSET_Y = GHOST_HEIGHT / 2;

export const GhostsView: FC<{
  ghostViewOptions?: Partial<GhostViewOptions>;
}> = observer(({ ghostViewOptions = DefaultGhostViewOptions }) => {
  const store = useGame();

  return (
    <>
      {store.ghosts.map(ghost => (
        <GhostCompositeView
          key={ghost.ghostNumber}
          ghost={ghost}
          ghostViewOptions={ghostViewOptions}
        />
      ))}
    </>
  );
});

export interface GhostViewOptions {
  target: boolean;
  wayPoints: boolean;
  hitBox: boolean;
}

const DefaultGhostViewOptions: GhostViewOptions = {
  target: true,
  wayPoints: false,
  hitBox: false,
};

export const GhostCompositeView: FC<{
  ghost: Ghost;
  ghostViewOptions?: Partial<GhostViewOptions>;
}> = observer(({ ghost, ghostViewOptions }) => {
  const options: GhostViewOptions = {
    ...DefaultGhostViewOptions,
    ...ghostViewOptions,
  };
  const { screenCoordinates } = ghost;
  return (
    <>
      {options.hitBox && (
        <GhostHitBox x={screenCoordinates.x} y={screenCoordinates.y} />
      )}
      <GhostView ghost={ghost} />
      {options.wayPoints && <WayPoints wayPoints={ghost.wayPoints ?? []} />}
      {options.target && (
        <Target tile={ghost.targetTile} color={ghost.colorCode} />
      )}
    </>
  );
});

export const GhostView: FC<{
  ghost: Ghost;
}> = observer(({ ghost }) => {
  const { screenCoordinates, animationPhase, direction, ghostNumber } = ghost;
  // TODO
  const frightenedGhostTime = 0;
  switch (ghost.state) {
    case 'frightened':
      return (
        <FrightenedGhostSprite
          frightenedGhostTime={frightenedGhostTime}
          ghostAnimationPhase={animationPhase}
          x={screenCoordinates.x - GHOST_OFFSET_X}
          y={screenCoordinates.y - GHOST_OFFSET_Y}
        />
      );
    case 'dead':
      return (
        <DeadGhostSprite
          direction={direction}
          x={screenCoordinates.x - GHOST_OFFSET_X}
          y={screenCoordinates.y - GHOST_OFFSET_Y}
        />
      );
    default:
      return (
        <GhostSprite
          direction={direction}
          ghostAnimationPhase={animationPhase}
          x={screenCoordinates.x - GHOST_OFFSET_X}
          y={screenCoordinates.y - GHOST_OFFSET_Y}
          ghostNumber={ghostNumber}
        />
      );
  }
});

type GhostSpriteProps = {
  direction: Direction;
  ghostAnimationPhase: GhostAnimationPhase;
  x: number;
  y: number;
  ghostNumber: number;
  style?: { [key: string]: any };
};

export const GhostSprite: FC<GhostSpriteProps> = ({
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

type DeadGhostSpriteProps = {
  direction: Direction;
  x: number;
  y: number;
  style?: { [key: string]: any };
};

export const DeadGhostSprite: FC<DeadGhostSpriteProps> = ({
  direction,
  x,
  y,
  style,
}) => (
  <Sprite
    className="Sprite-ghost"
    name={`dead-ghost-direction-${direction}`}
    x={x}
    y={y}
    style={style}
  />
);

type FrightenedGhostSpriteProps = {
  x: number;
  y: number;
  ghostAnimationPhase: GhostAnimationPhase;
  frightenedGhostTime: FrightenedGhostTime;
  style?: { [key: string]: any };
};

export const FrightenedGhostSprite: FC<FrightenedGhostSpriteProps> = ({
  x,
  y,
  ghostAnimationPhase,
  frightenedGhostTime,
  style,
}) => (
  <Sprite
    className="Sprite-ghost"
    name={`frightened-ghost-time-${frightenedGhostTime}-phase-${ghostAnimationPhase}`}
    x={x}
    y={y}
    style={style}
  />
);

export const GhostHitBox: FC<{ x: number; y: number }> = ({ x, y }) => {
  const rect = getGhostHitBox({ x, y });
  return <Box rect={rect} color="pink" />;
};
