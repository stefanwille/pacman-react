import { collide } from './collisionDetection';
import {
  SCALE_FACTOR,
  screenFromTile,
  TileCoordinates,
  ScreenCoordinates,
} from './Coordinates';
import { Game } from './Game';
import { Ghost } from './Ghost';
import { BASIC_PILL_ID, EMPTY_TILE_ID, TileId } from './MazeData';
import { getNextTile } from './Ways';
import { Directions } from './Types';
import { Rectangle } from './Rectangle';

const PILL_BOX_HIT_BOX_WIDTH = 2 * SCALE_FACTOR;
const PILL_BOX_HIT_BOX_HEIGHT = 2 * SCALE_FACTOR;

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

const PAC_MAN_HIT_BOX_WIDTH = 10 * SCALE_FACTOR;
const PAC_MAN_HIT_BOX_HEIGHT = 10 * SCALE_FACTOR;

export const getPacManHitBox = (screen: ScreenCoordinates): Rectangle => {
  return {
    x: screen.x - PAC_MAN_HIT_BOX_WIDTH / 2,
    y: screen.y - PAC_MAN_HIT_BOX_HEIGHT / 2 + 2,
    width: PAC_MAN_HIT_BOX_WIDTH,
    height: PAC_MAN_HIT_BOX_HEIGHT,
  };
};

const GHOST_HIT_BOX_WIDTH = 13 * SCALE_FACTOR;
const GHOST_HIT_BOX_HEIGHT = 13 * SCALE_FACTOR;

export const getGhostHitBox = (screen: ScreenCoordinates): Rectangle => {
  return {
    x: screen.x - GHOST_HIT_BOX_WIDTH / 2 + 2,
    y: screen.y - GHOST_HIT_BOX_HEIGHT / 2,
    width: GHOST_HIT_BOX_WIDTH,
    height: GHOST_HIT_BOX_HEIGHT,
  };
};

const detectPillEatingAt = (tile: TileCoordinates, game: Game) => {
  const pill: TileId = game.maze.pills[tile.y][tile.x];
  if (pill === EMPTY_TILE_ID) {
    return;
  }

  const pillHitBox: Rectangle = getPillHitBox(tile, pill);
  const pacManHitBox: Rectangle = getPacManHitBox(
    game.pacMan.screenCoordinates
  );
  if (collide(pacManHitBox, pillHitBox)) {
    eatPill(tile, game);
  }
};

const BASIC_PILL_POINTS = 10;

const eatPill = (tile: TileCoordinates, game: Game) => {
  const tileId = game.maze.pills[tile.y][tile.x];
  if (tileId === BASIC_PILL_ID) {
    game.score += BASIC_PILL_POINTS;
  }

  game.maze.pills[tile.y][tile.x] = EMPTY_TILE_ID;
};

const detectGhostCollisions = ({ store }: { store: Game }) => {
  const pacManHitBox: Rectangle = getPacManHitBox(
    store.pacMan.screenCoordinates
  );

  for (const ghost of store.ghosts) {
    const ghostHitBox: Rectangle = getGhostHitBox(ghost.screenCoordinates);
    if (collide(pacManHitBox, ghostHitBox)) {
      ghostCollidesWithPacMan(ghost, store);
    }
  }
};

const ghostCollidesWithPacMan = (ghost: Ghost, game: Game) => {
  game.pacMan.stateChart.send('COLLISION_WITH_GHOST');
  // ghost.send('COLLISION_WITH_PACMAN');
  ghost.ghostPaused = true;
};

export const detectCollisions = (game: Game) => {
  const tile = game.pacMan.tileCoordinates;
  detectPillEatingAt(tile, game);
  for (const direction of Directions) {
    const neighbourTile = getNextTile(tile, direction);
    detectPillEatingAt(neighbourTile, game);
  }
  detectGhostCollisions({ store: game });
};
