import { tileFromScreen, ScreenCoordinates } from './Coordinates';
import { PacMan, TOTAL_DYING_PAC_MAN_ANIMATION_LENGTH } from './PacMan';
import {
  isWayFreeInDirection,
  directionToVector as directionAsVector,
  isTileCenter,
} from './Ways';
import { Game } from './Game';
import { MilliSeconds } from './Types';

export const DELAY_TO_REVIVE_PAC_MAN: MilliSeconds = TOTAL_DYING_PAC_MAN_ANIMATION_LENGTH;

export const updatePacMan = (game: Game): void => {
  const pacMan = game.pacMan;
  if (pacMan.alive) {
    updateLivingPacMan(pacMan);
  } else {
    updateDeadPacMan(pacMan);
  }
};

const updateLivingPacMan = (pacMan: PacMan) => {
  if (isTileCenter(pacMan.screenCoordinates)) {
    const tile = tileFromScreen(pacMan.screenCoordinates);

    // Change direction if necessary
    if (
      pacMan.direction !== pacMan.nextDirection &&
      isWayFreeInDirection(tile, pacMan.nextDirection)
    ) {
      pacMan.direction = pacMan.nextDirection;
    }

    // Move
    if (isWayFreeInDirection(tile, pacMan.direction)) {
      movePacMan(pacMan);
    }
  } else {
    movePacMan(pacMan);
  }
};

const movePacMan = (pacMan: PacMan): void => {
  const speed = pacMan.game.speed;
  const delta: ScreenCoordinates = directionAsVector(pacMan.direction, speed);
  pacMan.moveBy(delta);
};

const updateDeadPacMan = (pacMan: PacMan) => {
  if (pacMan.timeSinceDeath >= TOTAL_DYING_PAC_MAN_ANIMATION_LENGTH) {
    revivePacMan(pacMan);
  }
  return;
};

const revivePacMan = (pacMan: PacMan) => {
  if (pacMan.extraLivesLeft > 0) {
    pacMan.extraLivesLeft -= 1;
    pacMan.game.revivePacMan();
  }
};
