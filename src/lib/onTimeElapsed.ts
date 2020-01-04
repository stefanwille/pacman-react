import { GameStore } from './GameStore';
import { Ghost } from './Ghost';
import { action } from 'mobx';
import { PacMan } from './PacMan';
import { SPEED, Direction } from '../components/Types';
import { Coordinates, screenFromTile, SCALE_FACTOR } from './Coordinates';
import { waysMatrix, WAY_FREE_ID, TileId, EMPTY_TILE_ID } from './MazeData';
import { tileFromScreen, TILE_SIZE } from './Coordinates';
import { Rectangle, collide } from './collisionDetection';

export const onTimeElapsed = action(
  ({ store, timestamp }: { store: GameStore; timestamp: number }) => {
    store.previousTimestamp = store.timestamp;
    store.timestamp = timestamp;
    if (store.gamePaused) {
      return;
    }

    updatePacMan({ pacManStore: store.pacMan, timestamp });
    for (const ghost of store.ghosts) {
      updateGhost({ ghostStore: ghost, timestamp });
    }

    detectCollisions({ store });
  }
);

export const isWayFreeAt = (tx: number, ty: number): boolean => {
  return waysMatrix[ty][tx] === WAY_FREE_ID;
};

const TILE_CENTER_OFFSET = TILE_SIZE / 2;

export const isTileCenter = (sx: number, sy: number): boolean => {
  return (
    (sx - TILE_CENTER_OFFSET) % TILE_SIZE === 0 &&
    (sy - TILE_CENTER_OFFSET) % TILE_SIZE === 0
  );
};

const DIRECTION_TO_TILE_OFFSET = {
  RIGHT: [1, 0],
  LEFT: [-1, 0],
  UP: [0, -1],
  DOWN: [0, 1],
};

const DIRECTION_TO_VELOCITY = {
  RIGHT: [SPEED, 0],
  LEFT: [-SPEED, 0],
  UP: [0, -SPEED],
  DOWN: [0, SPEED],
};

const nextTile = (
  tx: number,
  ty: number,
  direction: Direction
): Coordinates => {
  const [dx, dy] = DIRECTION_TO_TILE_OFFSET[direction];
  const nextTx = tx + dx;
  const nextTy = ty + dy;
  return [nextTx, nextTy];
};

export const isWayFreeInDirection = (
  tx: number,
  ty: number,
  direction: Direction
): boolean => {
  const [nextTileX, nextTileY] = nextTile(tx, ty, direction);
  return isWayFreeAt(nextTileX, nextTileY);
};

const movePacMan = (pacManStore: PacMan): void => {
  const [vx, vy] = DIRECTION_TO_VELOCITY[pacManStore.direction];
  pacManStore.x += vx;
  pacManStore.y += vy;
};

export const updatePacMan = ({
  pacManStore,
  timestamp,
}: {
  pacManStore: PacMan;
  timestamp: number;
}): void => {
  pacManStore.timestamp = timestamp;

  if (isTileCenter(pacManStore.x, pacManStore.y)) {
    const [tx, ty] = tileFromScreen(pacManStore.x, pacManStore.y);

    // Change direction if necessary
    if (
      pacManStore.direction !== pacManStore.nextDirection &&
      isWayFreeInDirection(tx, ty, pacManStore.nextDirection)
    ) {
      pacManStore.direction = pacManStore.nextDirection;
    }

    // Move
    if (isWayFreeInDirection(tx, ty, pacManStore.direction)) {
      movePacMan(pacManStore);
    }
  } else {
    movePacMan(pacManStore);
  }
};

export const updateGhost = ({
  ghostStore,
  timestamp,
}: {
  ghostStore: Ghost;
  timestamp: number;
}) => {
  ghostStore.timestamp = timestamp;

  ghostStore.x += ghostStore.vx;
  if (ghostStore.x > ghostStore.maxX) {
    ghostStore.x = ghostStore.maxX;
    ghostStore.vx = -1 * ghostStore.vx;
  }
  if (ghostStore.x <= ghostStore.minX) {
    ghostStore.x = ghostStore.minX;
    ghostStore.vx = -1 * ghostStore.vx;
  }

  ghostStore.y += ghostStore.vy;
  if (ghostStore.y > ghostStore.maxY) {
    ghostStore.y = ghostStore.maxY;
    ghostStore.vy = -1 * ghostStore.vy;
  }
  if (ghostStore.y <= ghostStore.minY) {
    ghostStore.y = ghostStore.minY;
    ghostStore.vy = -1 * ghostStore.vy;
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

const PAC_MAN_HIT_BOX_WIDTH = 12 * SCALE_FACTOR;
const PAC_MAN_HIT_BOX_HEIGHT = 13 * SCALE_FACTOR;

export const getPacManHitBox = (x: number, y: number): Rectangle => {
  return {
    x: x - PAC_MAN_HIT_BOX_WIDTH / 2,
    y: y - PAC_MAN_HIT_BOX_HEIGHT / 2 + 2,
    width: PAC_MAN_HIT_BOX_WIDTH,
    height: PAC_MAN_HIT_BOX_HEIGHT,
  };
};

const GHOST_HIT_BOX_WIDTH = 14 * SCALE_FACTOR;
const GHOST_HIT_BOX_HEIGHT = 14 * SCALE_FACTOR;

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

const detectGhostCollisions = ({ store }: { store: GameStore }) => {
  const pacManHitBox: Rectangle = getPacManHitBox(
    store.pacMan.x,
    store.pacMan.y
  );

  for (const ghost of store.ghosts) {
    const ghostHitBox: Rectangle = getGhostHitBox(ghost.x, ghost.y);
    if (collide(pacManHitBox, ghostHitBox)) {
      ghostKillsPacMan(ghost, store);
    }
  }
};

const eatPill = (tx: number, ty: number, store: GameStore) => {
  store.pills[ty][tx] = EMPTY_TILE_ID;
};

const ghostKillsPacMan = (ghost: Ghost, store: GameStore) => {
  store.gamePaused = true;
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
