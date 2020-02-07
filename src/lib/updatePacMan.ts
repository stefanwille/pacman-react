import { tileFromScreen } from './Coordinates';
import { PacMan } from './PacMan';
import {
  isWayFreeInDirection,
  DIRECTION_TO_VELOCITY,
  isTileCenter,
} from './Ways';

const movePacMan = (pacManStore: PacMan): void => {
  const [vx, vy] = DIRECTION_TO_VELOCITY[pacManStore.direction];
  pacManStore.x += vx;
  pacManStore.y += vy;
};

export const updatePacMan = ({
  pacMan,
  timestamp,
}: {
  pacMan: PacMan;
  timestamp: number;
}): void => {
  pacMan.timestamp = timestamp;

  if (pacMan.state === 'dead') {
    return;
  }

  if (isTileCenter(pacMan.x, pacMan.y)) {
    const [tx, ty] = tileFromScreen(pacMan.x, pacMan.y);

    // Change direction if necessary
    if (
      pacMan.direction !== pacMan.nextDirection &&
      isWayFreeInDirection(tx, ty, pacMan.nextDirection)
    ) {
      pacMan.direction = pacMan.nextDirection;
    }

    // Move
    if (isWayFreeInDirection(tx, ty, pacMan.direction)) {
      movePacMan(pacMan);
    }
  } else {
    movePacMan(pacMan);
  }
};
