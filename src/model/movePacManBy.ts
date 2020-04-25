import { action } from 'mobx';
import { MAZE_WIDTH_IN_SCREEN_COORDINATES } from './Coordinates';
import { PacMan, TotalPacManDyingAnimationLength } from './PacMan';
import { MilliSeconds } from './Types';
import { Vector } from './Vector';

export const DELAY_TO_REVIVE_PAC_MAN: MilliSeconds = TotalPacManDyingAnimationLength;

export const movePacManBy = action((pacMan: PacMan, vector: Vector) => {
  pacMan.screenCoordinates.x =
    (pacMan.screenCoordinates.x + vector.x + MAZE_WIDTH_IN_SCREEN_COORDINATES) %
    MAZE_WIDTH_IN_SCREEN_COORDINATES;
  pacMan.screenCoordinates.y += vector.y;
});
