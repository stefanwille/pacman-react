import { chooseNewTargetTile } from './chooseNewTargetTile';
import { chooseNextTile } from './chooseNextTile';
import { TileCoordinates } from './Coordinates';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost } from './Ghost';
import { Direction } from './Types';
import { directionToVector } from './Ways';
import {
  updateGhostStatePhaseTime,
  updateGhostStatePhase,
} from './updateGhostStatePhase';
import { Vector } from './Vector';
import { Game } from './Game';

export const updateGhosts = (game: Game) => {
  for (const ghost of game.ghosts) {
    updateGhost({ ghost });
  }
};

const updateGhost = ({ ghost }: { ghost: Ghost }) => {
  if (ghost.ghostPaused) {
    return;
  }

  updateGhostStatePhaseTime(ghost);
  updateDeadWaitingTimeInBoxLeft(ghost);

  updateGhostStatePhase(ghost);

  routeAndMoveGhost(ghost);
};

const updateDeadWaitingTimeInBoxLeft = (ghost: Ghost) => {
  if (ghost.dead && ghost.deadWaitingTimeInBoxLeft > 0) {
    ghost.deadWaitingTimeInBoxLeft -= ghost.game.lastFrameLength;
  }
};

export const routeAndMoveGhost = (ghost: Ghost) => {
  if (ghost.game.pacMan.dead) {
    return;
  }

  if (ghost.atTileCenter) {
    reRouteGhost(ghost);
  }

  moveGhost(ghost);
};

const reRouteGhost = (ghost: Ghost) => {
  ghost.targetTile = chooseNewTargetTile(ghost);
  updateDirection(ghost);
  updateSpeed(ghost);
};

const updateDirection = (ghost: Ghost) => {
  const newDirection = getNewDirection(ghost);
  ghost.direction = newDirection;
};

const updateSpeed = (ghost: Ghost) => {
  const newSpeedFactor = getNewSpeedFactor(ghost);
  ghost.speedFactor = newSpeedFactor;
};

export const getNewDirection = (ghost: Ghost): Direction => {
  const currentTile = ghost.tileCoordinates;
  const currentDirection = ghost.direction;
  const targetTile = ghost.targetTile;
  const boxDoorIsOpen = ghost.canPassThroughBoxDoor;

  const nextTile: TileCoordinates = chooseNextTile({
    currentTile,
    currentDirection,
    targetTile,
    boxDoorIsOpen,
  });

  return getDirectionFromTileToTile(currentTile, nextTile);
};

const moveGhost = (ghost: Ghost) => {
  const vector: Vector = getGhostMovementVector(ghost);
  ghost.moveBy(vector);
};

const isInTunnel = (tile: TileCoordinates) =>
  tile.y === 14 && (tile.x >= 22 || tile.x <= 5);

const getGhostMovementVector = (ghost: Ghost): Vector => {
  const speed = ghost.game.speed * ghost.speedFactor;
  const velocity = directionToVector(ghost.direction, speed);
  return velocity;
};

export const SPEED_FACTOR_HIGH = 2;
export const SPEED_FACTOR_NORMAL = 1;
export const SPEED_FACTOR_SLOW = 0.5;

const getNewSpeedFactor = (ghost: Ghost): number => {
  if (ghost.dead) {
    return SPEED_FACTOR_HIGH;
  }
  if (isInTunnel(ghost.tileCoordinates) || ghost.state === 'frightened') {
    return SPEED_FACTOR_SLOW;
  }
  return SPEED_FACTOR_NORMAL;
};
