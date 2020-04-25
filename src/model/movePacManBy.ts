import { action } from 'mobx';
import {
  MAZE_WIDTH_IN_SCREEN_COORDINATES,
  ScreenCoordinates,
} from './Coordinates';
import { PacMan, TOTAL_DYING_PAC_MAN_ANIMATION_LENGTH } from './PacMan';
import { MilliSeconds } from './Types';

export const DELAY_TO_REVIVE_PAC_MAN: MilliSeconds = TOTAL_DYING_PAC_MAN_ANIMATION_LENGTH;

export const movePacManBy = action(
  (pacMan: PacMan, delta: ScreenCoordinates) => {
    pacMan.screenCoordinates.x =
      (pacMan.screenCoordinates.x +
        delta.x +
        MAZE_WIDTH_IN_SCREEN_COORDINATES) %
      MAZE_WIDTH_IN_SCREEN_COORDINATES;
    pacMan.screenCoordinates.y += delta.y;
  }
);
