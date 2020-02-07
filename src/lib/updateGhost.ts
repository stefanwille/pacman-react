import { toJS } from 'mobx';
import { Direction, Directions } from '../components/Types';
import { assert } from './assert';
import { Coordinates, tileFromScreen } from './Coordinates';
import { Ghost } from './Ghost';
import {
  DIRECTION_TO_OPPOSITE_DIRECTION,
  DIRECTION_TO_VELOCITY,
  findWay,
  isTileCenter,
  isWayFreeInDirection,
} from './Ways';

const getDirection = (
  tileFrom: Coordinates,
  tileTo: Coordinates
): Direction => {
  assert(tileFrom, 'tileFrom');
  assert(tileTo, 'tileTo');

  if (tileFrom[0] < tileTo[0]) {
    return 'RIGHT';
  }
  if (tileFrom[0] > tileTo[0]) {
    return 'LEFT';
  }
  if (tileFrom[1] < tileTo[1]) {
    return 'DOWN';
  }
  if (tileFrom[1] > tileTo[1]) {
    return 'UP';
  }
  throw new Error('Same tiles');
};

const getGhostVelocity = (direction: Direction) => {
  return DIRECTION_TO_VELOCITY[direction];
};

const isGhostAtReroutingPoint = (ghost: Ghost): boolean => {
  if (!isTileCenter(ghost.x, ghost.y)) {
    return false;
  }

  const currentTile = tileFromScreen(ghost.x, ghost.y);
  console.log('currenTile', currentTile);

  const oppositeDirection: Direction =
    DIRECTION_TO_OPPOSITE_DIRECTION[ghost.direction];
  const possibleDirections = Directions.filter(
    direction => direction !== oppositeDirection
  );

  return possibleDirections.some(direction =>
    isWayFreeInDirection(currentTile[0], currentTile[1], direction, 1)
  );
};

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

  const [vx, vy] = getGhostVelocity(ghost.direction);
  ghost.x += vx;
  ghost.y += vy;
};

const reRouteGhost = (ghost: Ghost) => {
  const currentTile = tileFromScreen(ghost.x, ghost.y);
  const destination: Coordinates = ghost.game.pacMan.tileCoordinates;
  console.log('Tile Center', ghost.ghostNumber, currentTile, destination);

  ghost.wayPoints = findWay(currentTile, destination);
  if (ghost.wayPoints) {
    console.log('ghost.wayPoints', toJS(ghost.wayPoints));
    const nextTile: Coordinates = ghost.wayPoints[1];
    console.log(
      'ghost selecting direction at',
      currentTile,
      'to',
      toJS(nextTile)
    );
    ghost.direction = getDirection(currentTile, nextTile);
    console.log('direction is', ghost.direction);
  } else {
    console.log('Dead', ghost.ghostNumber);
  }
};
