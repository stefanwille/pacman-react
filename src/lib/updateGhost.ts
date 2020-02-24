import { isEqual } from 'lodash';
import { getTargetTileInScatterMode } from './chooseNewTargetTile';
import { TileCoordinates, isValidTileCoordinates } from './Coordinates';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost } from './Ghost';
import {
  DIRECTION_TO_DELTA,
  isTileCenter,
  getNextTile,
  isWayFreeAt,
} from './Ways';
import { findWayPoints } from './findWayPoints';
import { Direction, Directions } from './Types';
import { toJS } from 'mobx';

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
    updateDirection(ghost);
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
    throw new Error('No waypoints');
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

const getNewDestination = (ghost: Ghost): TileCoordinates => {
  switch (ghost.state) {
    case 'chase':
      return ghost.game.pacMan.tileCoordinates;
    case 'scatter':
      return getTargetTileInScatterMode(ghost);
    default:
      throw new Error(`State ${ghost.state}`);
  }
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
  const destination: TileCoordinates = getNewDestination(ghost);

  ghost.wayPoints = findWayPoints(currentTile, destination, ghost.direction);
  if (!ghost.wayPoints) {
    return;
  }
};
