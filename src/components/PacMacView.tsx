import React, { FC, Fragment } from 'react';
import { Sprite } from './Sprite';
import { Direction } from '../lib/Types';
import { observer } from 'mobx-react-lite';
import { useGame } from './StoreContext';
import { SCREEN_TILE_SIZE } from '../lib/Coordinates';
import { Box } from './Box';
import { DyingPacManPhase } from '../lib/PacMan';
import { getPacManHitBox } from '../lib/detectCollisions';

export type PacManPhase = 0 | 1 | 2;

export const PacManPhases: PacManPhase[] = [0, 1, 2];

const PAC_MAN_WIDTH = SCREEN_TILE_SIZE * 2;
const PAC_MAN_HEIGHT = SCREEN_TILE_SIZE * 2;

const PAC_MAN_OFFSET_X = PAC_MAN_WIDTH / 2 - 2;
const PAC_MAN_OFFSET_Y = PAC_MAN_HEIGHT / 2 - 2;

const HIT_BOX_VISIBLE = false;

export const PacManView: FC<{}> = observer(() => {
  const game = useGame();
  const pacMan = game.pacMan;
  const { screenCoordinates, direction, phase, state } = pacMan;
  const dead = state === 'dead';
  const alive = !dead;

  return (
    <Fragment>
      {HIT_BOX_VISIBLE && (
        <PacManHitBox x={screenCoordinates.x} y={screenCoordinates.y} />
      )}
      {alive && (
        <PacManSprite
          direction={direction}
          phase={phase}
          x={screenCoordinates.x - PAC_MAN_OFFSET_X}
          y={screenCoordinates.y - PAC_MAN_OFFSET_Y}
        />
      )}
      {dead && (
        <DyingPacManSprite
          phase={pacMan.dyingPhase}
          x={screenCoordinates.x - PAC_MAN_OFFSET_X}
          y={screenCoordinates.y - PAC_MAN_OFFSET_Y}
        />
      )}
    </Fragment>
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

export const DyingPacManSprite: FC<{
  phase: DyingPacManPhase;
  x: number;
  y: number;
  style?: { [key: string]: any };
}> = ({ phase, x, y, style }) => {
  return (
    <Sprite
      className="Sprite-dying-pacman"
      name={`dying-pacman-phase-${phase}`}
      x={x}
      y={y}
      style={style}
    />
  );
};

export const PacManHitBox: FC<{ x: number; y: number }> = ({ x, y }) => {
  const rect = getPacManHitBox({ x, y });
  return <Box rect={rect} color="green" />;
};
