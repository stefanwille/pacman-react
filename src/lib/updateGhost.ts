import { isEqual } from 'lodash';
import { toJS } from 'mobx';
import { assert } from './assert';
import { TileCoordinates } from './Coordinates';
import { Ghost, GhostDirection } from './Ghost';
import { DIRECTION_TO_DELTA, findWay, isTileCenter } from './Ways';

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

  if (isGhostAtReroutingPoint(ghost)) {
    reRouteGhost(ghost);
  }

  updateDirection(ghost);

  const delta = getGhostVelocity(ghost.direction);
  ghost.moveBy(delta);
};

const updateDirection = (ghost: Ghost) => {
  const newDirection = getNewDirection(ghost);
  ghost.direction = newDirection;
};

const getNewDirection = (ghost: Ghost): GhostDirection => {
  const currentTile = ghost.tileCoordinates;
  const wayPoints = ghost.wayPoints;

  if (!wayPoints) {
    return 'STANDSTILL';
  }

  const nextTile: TileCoordinates | null = findNextTile({
    currentTile,
    wayPoints,
  });
  if (!nextTile) {
    return 'STANDSTILL';
  }

  return getDirectionFromTileToTile(currentTile, nextTile);
};

const getDirectionFromTileToTile = (
  tileFrom: TileCoordinates,
  tileTo: TileCoordinates
): GhostDirection => {
  assert(tileFrom, 'tileFrom');
  assert(tileTo, 'tileTo');

  if (isEqual(tileFrom, tileTo)) {
    return 'STANDSTILL';
  }

  if (tileFrom.x < tileTo.x) {
    return 'RIGHT';
  }
  if (tileFrom.x > tileTo.x) {
    return 'LEFT';
  }
  if (tileFrom.y < tileTo.y) {
    return 'DOWN';
  }
  if (tileFrom.y > tileTo.y) {
    return 'UP';
  }
  throw new Error('Same tiles');
};

const getGhostVelocity = (direction: GhostDirection) => {
  return DIRECTION_TO_DELTA[direction];
};

const isGhostAtReroutingPoint = (ghost: Ghost): boolean => {
  return isTileCenter(ghost.screenCoordinates);
};

const getNewDestination = (ghost: Ghost) => {
  switch (ghost.state) {
    case 'chase':
      return ghost.game.pacMan.tileCoordinates;
    case 'scatter':
      return { x: 1, y: 1 };
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

  ghost.wayPoints = findWay(currentTile, destination);
  if (!ghost.wayPoints) {
    return;
  }
};
