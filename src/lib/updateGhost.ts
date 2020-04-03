import { chooseNewTargetTile } from './chooseNewTargetTile';
import { chooseNextTile } from './chooseNextTile';
import { TileCoordinates } from './Coordinates';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost } from './Ghost';
import { Direction } from './Types';
import { directionToVector } from './Ways';
import { updateGhostPhaseTime, updateGhostPhase } from './updateGhostPhase';
import { Vector } from './Vector';

export const updateGhost = ({ ghost }: { ghost: Ghost }) => {
  if (ghost.ghostPaused) {
    return;
  }

  updateGhostPhaseTime(ghost);

  if (ghost.atTileCenter) {
    updateGhostPhase(ghost);
  }

  routeAndMoveGhost(ghost);
};

export const routeAndMoveGhost = (ghost: Ghost) => {
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

const getNewSpeedFactor = (ghost: Ghost): number => {
  if (isInTunnel(ghost.tileCoordinates) || ghost.state === 'frightened') {
    // Half speed
    return 0.5;
  } else if (ghost.dead) {
    // High speed
    return 2;
  }
  return 1;
};
