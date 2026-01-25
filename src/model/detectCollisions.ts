import { collide } from './collisionDetection';
import {
  SCALE_FACTOR,
  ScreenCoordinates,
  screenFromTile,
  TileCoordinates,
  tileFromScreen,
} from './Coordinates';
import { eatEnergizer } from './eatEnergizer';
import { useGameStore } from './store';
import { BASIC_PILL_ID, EMPTY_TILE_ID, ENERGIZER_ID, TileId } from './MazeData';
import { Rectangle } from './Rectangle';

const PILL_BOX_HIT_BOX_WIDTH = 2;
const PILL_BOX_HIT_BOX_HEIGHT = 2;

export const getPillHitBox = (
  tile: TileCoordinates,
  pill: TileId
): Rectangle => {
  const screen = screenFromTile(tile);
  return {
    x: screen.x - PILL_BOX_HIT_BOX_WIDTH / 2,
    y: screen.y - PILL_BOX_HIT_BOX_WIDTH / 2,
    width: PILL_BOX_HIT_BOX_WIDTH,
    height: PILL_BOX_HIT_BOX_HEIGHT,
  };
};

const PAC_MAN_HIT_BOX_WIDTH = 15;
const PAC_MAN_HIT_BOX_HEIGHT = 15;

export const getPacManHitBox = (screen: ScreenCoordinates): Rectangle => {
  return {
    x: screen.x - PAC_MAN_HIT_BOX_WIDTH / 2 + 1,
    y: screen.y - PAC_MAN_HIT_BOX_HEIGHT / 2 + 2,
    width: PAC_MAN_HIT_BOX_WIDTH,
    height: PAC_MAN_HIT_BOX_HEIGHT,
  };
};

const GHOST_HIT_BOX_WIDTH = 10;
const GHOST_HIT_BOX_HEIGHT = 10;

export const getGhostHitBox = (screen: ScreenCoordinates): Rectangle => {
  return {
    x: screen.x - (GHOST_HIT_BOX_WIDTH * SCALE_FACTOR) / 2,
    y: screen.y - (GHOST_HIT_BOX_HEIGHT * SCALE_FACTOR) / 2,
    width: GHOST_HIT_BOX_WIDTH * SCALE_FACTOR,
    height: GHOST_HIT_BOX_HEIGHT * SCALE_FACTOR,
  };
};

const detectPacManEatingPill = () => {
  const store = useGameStore.getState();
  const pacMan = store.game.pacMan;
  const maze = store.game.maze;

  const pillTile = tileFromScreen(pacMan.screenCoordinates);
  const pill: TileId = maze.pills[pillTile.y][pillTile.x];

  if (pill === EMPTY_TILE_ID) {
    return;
  }

  const pillHitBox: Rectangle = getPillHitBox(pillTile, pill);
  const pacManHitBox: Rectangle = getPacManHitBox(pacMan.screenCoordinates);

  if (collide(pacManHitBox, pillHitBox)) {
    eatPillLayerObject(pillTile, pill);
  }
};

export const BASIC_PILL_POINTS = 10;

const eatPillLayerObject = (tile: TileCoordinates, tileId: TileId) => {
  switch (tileId) {
    case BASIC_PILL_ID:
      eatPill();
      break;
    case ENERGIZER_ID:
      eatEnergizer();
      break;
    default:
      console.error('Unknown pill layer tile id', tileId);
      break;
  }

  // Remove the pill from the maze
  useGameStore.setState((state) => {
    state.game.maze.pills[tile.y][tile.x] = EMPTY_TILE_ID;
  });
};

const eatPill = () => {
  useGameStore.setState((state) => {
    state.game.score += BASIC_PILL_POINTS;
  });
};

const detectGhostCollisions = () => {
  const store = useGameStore.getState();
  const pacMan = store.game.pacMan;
  const ghosts = store.game.ghosts;

  const pacManHitBox: Rectangle = getPacManHitBox(pacMan.screenCoordinates);

  for (let i = 0; i < ghosts.length; i++) {
    const ghost = ghosts[i];
    const isDead = ghost.state === 'dead';

    if (isDead) {
      continue;
    }

    const ghostHitBox: Rectangle = getGhostHitBox(ghost.screenCoordinates);

    if (collide(pacManHitBox, ghostHitBox)) {
      ghostCollidesWithPacMan(i);
    }
  }
};

export const ghostCollidesWithPacMan = (ghostIndex: number) => {
  const store = useGameStore.getState();
  store.sendPacManEvent('COLLISION_WITH_GHOST');
  store.sendGhostEvent(ghostIndex, 'COLLISION_WITH_PAC_MAN');
};

export const detectCollisions = () => {
  const store = useGameStore.getState();
  const pacManDead = store.game.pacMan.state === 'dead';

  if (pacManDead) {
    return;
  }

  detectPacManEatingPill();
  detectGhostCollisions();
};
