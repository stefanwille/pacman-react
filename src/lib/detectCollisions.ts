import { collide, Rectangle } from './collisionDetection';
import { SCALE_FACTOR, screenFromTile, tileFromScreen } from './Coordinates';
import { GameStore } from './GameStore';
import { Ghost } from './Ghost';
import { BASIC_PILL_ID, EMPTY_TILE_ID, TileId } from './MazeData';

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
  ghost.ghostPaused = true;
};

export const detectCollisions = ({ store }: { store: GameStore }) => {
  const [tx, ty] = tileFromScreen(store.pacMan.x, store.pacMan.y);
  detectPillEatingAt({ tx, ty, store });
  detectPillEatingAt({ tx: tx + 1, ty, store });
  detectPillEatingAt({ tx: tx - 1, ty, store });
  detectPillEatingAt({ tx, ty: ty + 1, store });
  detectPillEatingAt({ tx, ty: ty - 1, store });

  detectGhostCollisions({ store });
};
