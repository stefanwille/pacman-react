import { isEqual } from 'lodash';
import { chooseNewTargetTile } from './chooseNewTargetTile';
import { isValidTileCoordinates, TileCoordinates } from './Coordinates';
import { findWayPoints } from './findWayPoints';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost } from './Ghost';
import { Direction, Directions } from './Types';
import {
  DIRECTION_TO_DELTA,
  getNextTile,
  isTileCenter,
  isWayFreeAt,
} from './Ways';

export const updateGhost = ({
  ghost,
  timestamp,
}: {
  ghost: Ghost;
  timestamp: number;
}) => {
  ghost.timestamp = timestamp;

  if (ghost.ghostPaused) {
    return;
  }

  if (isGhostAtTileCenter(ghost)) {
    reRouteGhost(ghost);
  }

  const delta = getGhostVelocity(ghost.direction);
  ghost.moveBy(delta);
};

const updateDirection = (ghost: Ghost) => {
  const newDirection = getNewDirection(ghost);
  ghost.direction = newDirection;
};

const getNewDirection = (ghost: Ghost): Direction => {
  const currentTile = ghost.tileCoordinates;
  const wayPoints = ghost.wayPoints;

  if (!wayPoints) {
    const randomDirection = chooseRandomDirection(
      ghost.tileCoordinates,
      ghost.direction
    );
    return randomDirection;
  }

  const nextTile: TileCoordinates | null = findNextTile({
    currentTile,
    wayPoints,
  });

  if (!nextTile) {
    const randomDirection = chooseRandomDirection(
      ghost.tileCoordinates,
      ghost.direction
    );
    return randomDirection;
  }

  return getDirectionFromTileToTile(currentTile, nextTile);
};

const getGhostVelocity = (direction: Direction) => {
  return DIRECTION_TO_DELTA[direction];
};

const isGhostAtTileCenter = (ghost: Ghost): boolean => {
  return isTileCenter(ghost.screenCoordinates);
};

const chooseRandomDirection = (
  currentTile: TileCoordinates,
  currentDirection: Direction
): Direction => {
  const candidates: Direction[] = [];

  for (const direction of Directions) {
    const neighbourTile = getNextTile(currentTile, direction);

    if (!isValidTileCoordinates(neighbourTile)) {
      continue;
    }

    // Is this way free?
    if (!isWayFreeAt(neighbourTile)) {
      continue;
    }

    candidates.push(direction);
  }
  if (candidates.length === 0) {
    throw new Error(`No directions at ${currentTile}`);
  }

  return candidates[0];
};

export const findNextTile = ({
  currentTile,
  wayPoints,
}: {
  currentTile: TileCoordinates;
  wayPoints: TileCoordinates[];
}): TileCoordinates | null => {
  const indexOfCurrentTile = wayPoints.findIndex(wayPoint =>
    isEqual(wayPoint, currentTile)
  );
  if (indexOfCurrentTile + 1 >= wayPoints.length) {
    return null;
  }
  return wayPoints[indexOfCurrentTile + 1];
};

const reRouteGhost = (ghost: Ghost) => {
  const currentTile = ghost.tileCoordinates;
  ghost.targetTile = chooseNewTargetTile(ghost);

  ghost.wayPoints = findWayPoints(
    currentTile,
    ghost.targetTile,
    ghost.direction
  );
  updateDirection(ghost);
};
