import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import {
  SCREEN_TILE_SIZE,
  SCREEN_TILE_CENTER,
} from '../../../model/Coordinates';
import { getGhostHitBox } from '../../../model/detectCollisions';
import {
  Ghost,
  GhostAnimationPhase,
  FrightenedGhostTime,
} from '../../../model/Ghost';
import { Direction } from '../../../model/Types';
import { WayPoints } from '../../WayFindingPage/WayPoints';
import { Box } from '../../../components/Box';
import { Sprite } from '../../../components/Sprite';
import { useGame, useStore } from '../../../components/StoreContext';
import { Target } from './Target';
import { GhostViewOptions } from '../../../model/GhostViewOptions';
import { GameViewOptions } from '../../../model/GameViewOptions';

const GHOST_WIDTH = SCREEN_TILE_SIZE * 2;
const GHOST_HEIGHT = SCREEN_TILE_SIZE * 2;

const GHOST_OFFSET_X = GHOST_WIDTH / 2 - 0;
const GHOST_OFFSET_Y = GHOST_HEIGHT / 2;

export const GhostsGameView = observer(() => {
  const store = useStore();
  const { ghostViewOptions, gameViewOptions } = store.debugState;

  return (
    <GhostsView
      ghostViewOptions={ghostViewOptions}
      gameViewOptions={gameViewOptions}
    />
  );
});

export const GhostsView: FC<{
  ghostViewOptions?: GhostViewOptions;
  gameViewOptions?: GameViewOptions;
}> = observer(
  ({
    ghostViewOptions = DefaultGhostViewOptions,
    gameViewOptions = DefaultGameViewOptions,
  }) => {
    const store = useGame();

    return (
      <>
        {store.ghosts.map(ghost => (
          <GhostCompositeView
            key={ghost.ghostNumber}
            ghost={ghost}
            ghostViewOptions={ghostViewOptions}
            gameViewOptions={gameViewOptions}
          />
        ))}
      </>
    );
  }
);

const DefaultGhostViewOptions: GhostViewOptions = {
  target: false,
  wayPoints: false,
};

const DefaultGameViewOptions: GameViewOptions = {
  hitBox: false,
};

export const GhostCompositeView: FC<{
  ghost: Ghost;
  ghostViewOptions: GhostViewOptions;
  gameViewOptions: GameViewOptions;
}> = observer(({ ghost, ghostViewOptions, gameViewOptions }) => {
  const { screenCoordinates } = ghost;
  return (
    <>
      {gameViewOptions.hitBox && (
        <GhostHitBox
          x={screenCoordinates.x + SCREEN_TILE_CENTER}
          y={screenCoordinates.y + SCREEN_TILE_CENTER}
          color="green"
        />
      )}
      <GhostView ghost={ghost} />
      {ghostViewOptions.wayPoints && (
        <WayPoints wayPoints={ghost.wayPoints ?? []} color={ghost.colorCode} />
      )}
      {ghostViewOptions.target && (
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
  switch (ghost.state) {
    case 'frightened':
      return (
        <FrightenedGhostSprite
          frightenedGhostTime={ghost.frightenedGhostTime}
          ghostAnimationPhase={animationPhase}
          x={screenCoordinates.x + SCREEN_TILE_CENTER - GHOST_OFFSET_X}
          y={screenCoordinates.y + SCREEN_TILE_CENTER - GHOST_OFFSET_Y}
        />
      );
    case 'dead':
      return (
        <DeadGhostSprite
          direction={direction}
          x={screenCoordinates.x + SCREEN_TILE_CENTER - GHOST_OFFSET_X}
          y={screenCoordinates.y + SCREEN_TILE_CENTER - GHOST_OFFSET_Y}
        />
      );
    default:
      return (
        <GhostSprite
          direction={direction}
          ghostAnimationPhase={animationPhase}
          x={screenCoordinates.x + SCREEN_TILE_CENTER - GHOST_OFFSET_X}
          y={screenCoordinates.y + SCREEN_TILE_CENTER - GHOST_OFFSET_Y}
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

export const GhostHitBox: FC<{ x: number; y: number; color: string }> = ({
  x,
  y,
  color,
}) => {
  const rect = getGhostHitBox({ x, y });
  return <Box rect={rect} color={color} />;
};
