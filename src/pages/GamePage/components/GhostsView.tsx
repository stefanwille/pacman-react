import React, { FC } from 'react';
import {
  SCREEN_TILE_SIZE,
  SCREEN_TILE_CENTER,
  tileFromScreen,
} from '../../../model/Coordinates';
import { getGhostHitBox } from '../../../model/detectCollisions';
import { Direction } from '../../../model/Types';
import { WayPoints } from '../../WayFindingPage/WayPoints';
import { Box } from '../../../components/Box';
import { Sprite } from '../../../components/Sprite';
import { useGameStore, GhostState, FRIGHTENED_ABOUT_TO_END_DURATION } from '../../../model/store';
import { Target } from './Target';
import { GhostViewOptions } from '../../../model/GhostViewOptions';
import { GameViewOptions } from '../../../model/GameViewOptions';
import { findWayPoints } from '../../../model/findWayPoints';
import { canGhostPassThroughBoxDoor } from '../../../model/store/ghostHelpers';

// Ghost types
export type GhostAnimationPhase = 0 | 1;
export type FrightenedGhostTime = 0 | 1;

const GHOST_WIDTH = SCREEN_TILE_SIZE * 2;
const GHOST_HEIGHT = SCREEN_TILE_SIZE * 2;

const GHOST_OFFSET_X = GHOST_WIDTH / 2 - 0;
const GHOST_OFFSET_Y = GHOST_HEIGHT / 2;

export const GhostsGameView: FC = () => {
  const ghostViewOptions = useGameStore((state) => state.debugState.ghostViewOptions);
  const gameViewOptions = useGameStore((state) => state.debugState.gameViewOptions);

  return (
    <GhostsView
      ghostViewOptions={ghostViewOptions}
      gameViewOptions={gameViewOptions}
    />
  );
};

export const GhostsView: FC<{
  ghostViewOptions?: GhostViewOptions;
  gameViewOptions?: GameViewOptions;
}> = ({
  ghostViewOptions = DefaultGhostViewOptions,
  gameViewOptions = DefaultGameViewOptions,
}) => {
  const ghosts = useGameStore((state) => state.game.ghosts);

  return (
    <>
      {ghosts.map((ghost, index) => (
        <GhostCompositeView
          key={ghost.ghostNumber}
          ghostIndex={index}
          ghostViewOptions={ghostViewOptions}
          gameViewOptions={gameViewOptions}
        />
      ))}
    </>
  );
};

const DefaultGhostViewOptions: GhostViewOptions = {
  target: false,
  wayPoints: false,
};

const DefaultGameViewOptions: GameViewOptions = {
  hitBox: false,
};

export const GhostCompositeView: FC<{
  ghostIndex: number;
  ghostViewOptions: GhostViewOptions;
  gameViewOptions: GameViewOptions;
}> = ({ ghostIndex, ghostViewOptions, gameViewOptions }) => {
  const ghost = useGameStore((state) => state.game.ghosts[ghostIndex]);
  const timestamp = useGameStore((state) => state.game.timestamp);
  const energizerTimeLeft = useGameStore((state) => {
    const timer = state.game.energizerTimer;
    return timer.duration - timer.timeSpent;
  });

  const { screenCoordinates, targetTile, direction, colorCode } = ghost;
  const tileCoordinates = tileFromScreen(screenCoordinates);
  const boxDoorIsOpen = canGhostPassThroughBoxDoor(ghost, timestamp);

  const wayPoints = ghostViewOptions.wayPoints
    ? findWayPoints(tileCoordinates, targetTile, direction, boxDoorIsOpen)
    : null;

  return (
    <>
      {gameViewOptions.hitBox && (
        <GhostHitBox
          x={screenCoordinates.x + SCREEN_TILE_CENTER}
          y={screenCoordinates.y + SCREEN_TILE_CENTER}
          color="green"
        />
      )}
      <GhostView
        ghost={ghost}
        timestamp={timestamp}
        energizerTimeLeft={energizerTimeLeft}
      />
      {ghostViewOptions.wayPoints && wayPoints && (
        <WayPoints wayPoints={wayPoints} color={colorCode} />
      )}
      {ghostViewOptions.target && (
        <Target tile={targetTile} color={colorCode} />
      )}
    </>
  );
};

const getGhostAnimationPhase = (timestamp: number, ghostNumber: number): GhostAnimationPhase => {
  return Math.round((timestamp + ghostNumber * 100) / 300) % 2 === 0 ? 0 : 1;
};

const getFrightenedGhostTime = (
  timestamp: number,
  energizerTimeLeft: number
): FrightenedGhostTime => {
  const frightenedAboutToEnd = energizerTimeLeft < FRIGHTENED_ABOUT_TO_END_DURATION;
  if (!frightenedAboutToEnd) {
    return 0;
  }
  // Blink every 0.5 seconds
  return timestamp % 1000 < 500 ? 0 : 1;
};

export const GhostView: FC<{
  ghost: GhostState;
  timestamp: number;
  energizerTimeLeft: number;
}> = ({ ghost, timestamp, energizerTimeLeft }) => {
  const { screenCoordinates, direction, ghostNumber, state } = ghost;
  const animationPhase = getGhostAnimationPhase(timestamp, ghostNumber);
  const frightenedGhostTime = getFrightenedGhostTime(timestamp, energizerTimeLeft);

  switch (state) {
    case 'frightened':
      return (
        <FrightenedGhostSprite
          frightenedGhostTime={frightenedGhostTime}
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
};

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
