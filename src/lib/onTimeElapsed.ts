import { GameStore } from './GameStore';
import { Ghost } from './Ghost';
import { action, toJS } from 'mobx';
import { Direction, Directions } from '../components/Types';
import { screenFromTile, SCALE_FACTOR, Coordinates } from './Coordinates';
import { TileId, EMPTY_TILE_ID, BASIC_PILL_ID } from './MazeData';
import { tileFromScreen } from './Coordinates';
import { Rectangle, collide } from './collisionDetection';
import {
  isWayFreeInDirection,
  findWay,
  DIRECTION_TO_OPPOSITE_DIRECTION,
  DIRECTION_TO_VELOCITY,
  isTileCenter,
} from './Ways';
import { assert } from './assert';
import { updatePacMan } from './updatePacMan';

export const onTimeElapsed = action(
  'onTimeElapsed',
  ({ store, timestamp }: { store: GameStore; timestamp: number }) => {
    store.previousTimestamp = store.timestamp;
    store.timestamp = timestamp;
    if (store.gamePaused) {
      return;
    }

    updatePacMan({ pacMan: store.pacMan, timestamp });
    for (const ghost of store.ghosts) {
      updateGhost({ ghost: ghost, timestamp });
    }

    detectCollisions({ store });
  }
);

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

const PILL_BOX_HIT_BOX_WIDTH = 2 * SCALE_FACTOR;
const PILL_BOX_HIT_BOX_HEIGHT = 2 * SCALE_FACTOR;

export const getPillHitBox = (
  tx: number,
  ty: number,
  pill: TileId
): Rectangle => {
  const [sx, sy] = screenFromTile(tx, ty);
  return {
    x: sx - PILL_BOX_HIT_BOX_WIDTH / 2,
    y: sy - PILL_BOX_HIT_BOX_WIDTH / 2,
    width: PILL_BOX_HIT_BOX_WIDTH,
    height: PILL_BOX_HIT_BOX_HEIGHT,
  };
};

const PAC_MAN_HIT_BOX_WIDTH = 10 * SCALE_FACTOR;
const PAC_MAN_HIT_BOX_HEIGHT = 10 * SCALE_FACTOR;

export const getPacManHitBox = (x: number, y: number): Rectangle => {
  return {
    x: x - PAC_MAN_HIT_BOX_WIDTH / 2,
    y: y - PAC_MAN_HIT_BOX_HEIGHT / 2 + 2,
    width: PAC_MAN_HIT_BOX_WIDTH,
    height: PAC_MAN_HIT_BOX_HEIGHT,
  };
};

const GHOST_HIT_BOX_WIDTH = 13 * SCALE_FACTOR;
const GHOST_HIT_BOX_HEIGHT = 13 * SCALE_FACTOR;

export const getGhostHitBox = (x: number, y: number): Rectangle => {
  return {
    x: x - GHOST_HIT_BOX_WIDTH / 2 + 2,
    y: y - GHOST_HIT_BOX_HEIGHT / 2,
    width: GHOST_HIT_BOX_WIDTH,
    height: GHOST_HIT_BOX_HEIGHT,
  };
};

const detectPillEatingAt = ({
  tx,
  ty,
  store,
}: {
  tx: number;
  ty: number;
  store: GameStore;
}) => {
  const pill: TileId = store.pills[ty][tx];
  if (pill === EMPTY_TILE_ID) {
    return;
  }

  const pillHitBox: Rectangle = getPillHitBox(tx, ty, pill);
  const pacManHitBox: Rectangle = getPacManHitBox(
    store.pacMan.x,
    store.pacMan.y
  );
  if (collide(pacManHitBox, pillHitBox)) {
    eatPill(tx, ty, store);
  }
};

const BASIC_PILL_POINTS = 10;

const eatPill = (tx: number, ty: number, store: GameStore) => {
  const tileId = store.pills[ty][tx];
  if (tileId === BASIC_PILL_ID) {
    store.score += BASIC_PILL_POINTS;
  }

  store.pills[ty][tx] = EMPTY_TILE_ID;
};

const detectGhostCollisions = ({ store }: { store: GameStore }) => {
  const pacManHitBox: Rectangle = getPacManHitBox(
    store.pacMan.x,
    store.pacMan.y
  );

  for (const ghost of store.ghosts) {
    const ghostHitBox: Rectangle = getGhostHitBox(ghost.x, ghost.y);
    if (collide(pacManHitBox, ghostHitBox)) {
      ghostCollidesWithPacMan(ghost, store);
    }
  }
};

const ghostCollidesWithPacMan = (ghost: Ghost, store: GameStore) => {
  store.pacMan.stateChart.send('COLLISION_WITH_GHOST');
  // ghost.send('COLLISION_WITH_PACMAN');
};

const detectCollisions = ({ store }: { store: GameStore }) => {
  const [tx, ty] = tileFromScreen(store.pacMan.x, store.pacMan.y);
  detectPillEatingAt({ tx, ty, store });
  detectPillEatingAt({ tx: tx + 1, ty, store });
  detectPillEatingAt({ tx: tx - 1, ty, store });
  detectPillEatingAt({ tx, ty: ty + 1, store });
  detectPillEatingAt({ tx, ty: ty - 1, store });

  detectGhostCollisions({ store });
};
