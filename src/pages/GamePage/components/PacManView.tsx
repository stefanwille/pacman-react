import React, { FC, CSSProperties } from 'react';
import { Sprite } from '../../../components/Sprite';
import { Direction } from '../../../model/Types';
import { observer } from 'mobx-react-lite';
import { useGame, useStore } from './StoreContext';
import {
  SCREEN_TILE_SIZE,
  SCREEN_TILE_CENTER,
} from '../../../model/Coordinates';
import { Box } from '../../../components/Box';
import { DyingPacManPhase } from '../../../model/PacMan';
import { getPacManHitBox } from '../../../model/detectCollisions';

export type PacManPhase = 0 | 1 | 2;

export const PacManPhases: PacManPhase[] = [0, 1, 2];

const PAC_MAN_WIDTH = SCREEN_TILE_SIZE * 2;
const PAC_MAN_HEIGHT = SCREEN_TILE_SIZE * 2;

const PAC_MAN_OFFSET_X = PAC_MAN_WIDTH / 2 - 2;
const PAC_MAN_OFFSET_Y = PAC_MAN_HEIGHT / 2 - 2;

export const PacManView: FC<{}> = observer(() => {
  const store = useStore();
  const game = useGame();
  const pacMan = game.pacMan;
  const { dead, alive, screenCoordinates, direction, phase } = pacMan;
  const { gameViewOptions } = store.debugState;
  return (
    <>
      {gameViewOptions.hitBox && (
        <PacManHitBox
          x={screenCoordinates.x + SCREEN_TILE_CENTER}
          y={screenCoordinates.y + SCREEN_TILE_CENTER}
        />
      )}
      {alive && (
        <PacManSprite
          direction={direction}
          phase={phase}
          x={screenCoordinates.x + SCREEN_TILE_CENTER - PAC_MAN_OFFSET_X}
          y={screenCoordinates.y + SCREEN_TILE_CENTER - PAC_MAN_OFFSET_Y}
        />
      )}
      {dead && (
        <DyingPacManSprite
          phase={pacMan.dyingPhase}
          x={screenCoordinates.x + SCREEN_TILE_CENTER - PAC_MAN_OFFSET_X}
          y={screenCoordinates.y + SCREEN_TILE_CENTER - PAC_MAN_OFFSET_Y}
        />
      )}
    </>
  );
});

export const PacManSprite: FC<{
  direction: Direction;
  phase: PacManPhase;
  x: number;
  y: number;
  style?: CSSProperties;
}> = ({ direction, phase, x, y, style }) => (
  <Sprite
    className="Sprite-pacman"
    name={`pacman-direction-${direction}-phase-${phase}`}
    x={x}
    y={y}
    style={style}
  />
);

export const DyingPacManSprite: FC<{
  phase: DyingPacManPhase;
  x: number;
  y: number;
  style?: CSSProperties;
}> = ({ phase, x, y, style }) => (
  <Sprite
    className="Sprite-dying-pacman"
    name={`dying-pacman-phase-${phase}`}
    x={x}
    y={y}
    style={style}
  />
);

export const PacManHitBox: FC<{ x: number; y: number }> = ({ x, y }) => {
  const rect = getPacManHitBox({ x, y });
  return <Box rect={rect} color="green" />;
};
