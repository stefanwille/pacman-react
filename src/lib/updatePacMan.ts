import { tileFromScreen, ScreenCoordinates } from './Coordinates';
import { PacMan } from './PacMan';
import { isWayFreeInDirection, DIRECTION_TO_DELTA, isTileCenter } from './Ways';
import { Game } from './Game';
import { MilliSeconds } from './Types';

export const DELAY_TO_REVIVE_PAC_MAN: MilliSeconds = 7000;

export const updatePacMan = (game: Game): void => {
  const pacMan = game.pacMan;
  if (pacMan.state === 'dead') {
    if (pacMan.timePassedSinceDeath >= DELAY_TO_REVIVE_PAC_MAN) {
      revivePacMan(game);
    }
    return;
  }

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
  const delta: ScreenCoordinates = DIRECTION_TO_DELTA[pacMan.direction];
  pacMan.moveBy(delta);
};

const revivePacMan = (game: Game) => {
  if (game.pacMan.extraLivesLeft > 0) {
    game.pacMan.extraLivesLeft -= 1;
    game.revivePacMan();
  }
};
