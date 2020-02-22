import { toJS } from 'mobx';
import { Direction } from '../components/Types';
import { assert } from './assert';
import { TileCoordinates } from './Coordinates';
import { Ghost } from './Ghost';
import { DIRECTION_TO_DELTA, findWay, isTileCenter } from './Ways';

const getDirection = (
  tileFrom: TileCoordinates,
  tileTo: TileCoordinates
): Direction => {
  assert(tileFrom, 'tileFrom');
  assert(tileTo, 'tileTo');

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

const getGhostVelocity = (direction: Direction) => {
  return DIRECTION_TO_DELTA[direction];
};

const isGhostAtReroutingPoint = (ghost: Ghost): boolean => {
  return isTileCenter(ghost.screenCoordinates);
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

  const delta = getGhostVelocity(ghost.direction);
  ghost.moveBy(delta);
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

const reRouteGhost = (ghost: Ghost) => {
  const currentTile = ghost.tileCoordinates;
  const destination: TileCoordinates = getNewDestination(ghost);
  console.log('Tile Center', ghost.ghostNumber, currentTile, destination);

  ghost.wayPoints = findWay(currentTile, destination);
  if (ghost.wayPoints && ghost.wayPoints.length >= 2) {
    console.log('ghost.wayPoints', toJS(ghost.wayPoints));
    const nextTile: TileCoordinates = ghost.wayPoints[1];
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
