import { collide } from './collisionDetection';
import {
  ScreenCoordinates,
  screenFromTile,
  TileCoordinates,
} from './Coordinates';
import { Game } from './Game';
import { BASIC_PILL_ID, EMPTY_TILE_ID, TileId } from './MazeData';
import { Rectangle } from './Rectangle';
import { Directions } from './Types';
import { getNextTile } from './Ways';

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

const PAC_MAN_HIT_BOX_WIDTH = 10;
const PAC_MAN_HIT_BOX_HEIGHT = 10;

export const getPacManHitBox = (screen: ScreenCoordinates): Rectangle => {
  return {
    x: screen.x - PAC_MAN_HIT_BOX_WIDTH / 2,
    y: screen.y - PAC_MAN_HIT_BOX_HEIGHT / 2 + 2,
    width: PAC_MAN_HIT_BOX_WIDTH,
    height: PAC_MAN_HIT_BOX_HEIGHT,
  };
};

const GHOST_HIT_BOX_WIDTH = 13;
const GHOST_HIT_BOX_HEIGHT = 13;

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

export const BASIC_PILL_POINTS = 10;

const eatPill = (tile: TileCoordinates, game: Game) => {
  const tileId = game.maze.pills[tile.y][tile.x];
  if (tileId === BASIC_PILL_ID) {
    game.score += BASIC_PILL_POINTS;
  }

  game.maze.pills[tile.y][tile.x] = EMPTY_TILE_ID;
};

const detectGhostCollisions = (game: Game) => {
  const pacManHitBox: Rectangle = getPacManHitBox(
    game.pacMan.screenCoordinates
  );

  for (const ghost of game.ghosts) {
    const ghostHitBox: Rectangle = getGhostHitBox(ghost.screenCoordinates);
    if (collide(pacManHitBox, ghostHitBox)) {
      ghostCollidesWithPacMan(game);
    }
  }
};

export const ghostCollidesWithPacMan = (game: Game) => {
  game.pacMan.send('COLLISION_WITH_GHOST');
  for (const ghost of game.ghosts) {
    ghost.send('COLLISION_WITH_PAC_MAN');
  }
};

export const detectCollisions = (game: Game) => {
  const tile = game.pacMan.tileCoordinates;
  detectPillEatingAt(tile, game);
  for (const direction of Directions) {
    const neighbourTile = getNextTile(tile, direction);
    detectPillEatingAt(neighbourTile, game);
  }
  detectGhostCollisions(game);
};
