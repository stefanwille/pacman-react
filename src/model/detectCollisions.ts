import { collide } from './collisionDetection';
import {
  SCALE_FACTOR,
  ScreenCoordinates,
  screenFromTile,
  TileCoordinates,
} from './Coordinates';
import { eatEnergizer } from './eatEnergizer';
import { Game } from './Game';
import { Ghost } from './Ghost';
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

const detectPacManEatingPill = (game: Game) => {
  const pillTile = game.pacMan.tileCoordinates;
  const pill: TileId = game.maze.pills[pillTile.y][pillTile.x];
  if (pill === EMPTY_TILE_ID) {
    return;
  }

  const pillHitBox: Rectangle = getPillHitBox(pillTile, pill);
  const pacManHitBox: Rectangle = getPacManHitBox(
    game.pacMan.screenCoordinates
  );
  if (collide(pacManHitBox, pillHitBox)) {
    eatPillLayerObject(pillTile, game);
  }
};

export const BASIC_PILL_POINTS = 10;

const eatPillLayerObject = (tile: TileCoordinates, game: Game) => {
  const tileId = game.maze.pills[tile.y][tile.x];
  switch (tileId) {
    case BASIC_PILL_ID:
      eatPill(tile, game);
      break;
    case ENERGIZER_ID:
      eatEnergizer(game);
      break;
    default:
      console.error('Unknown pill layer tile id', tileId);
      break;
  }

  game.maze.pills[tile.y][tile.x] = EMPTY_TILE_ID;
};

const eatPill = (tile: TileCoordinates, game: Game) => {
  game.score += BASIC_PILL_POINTS;
};

const detectGhostCollisions = (game: Game) => {
  const pacManHitBox: Rectangle = getPacManHitBox(
    game.pacMan.screenCoordinates
  );

  for (const ghost of game.ghosts) {
    if (ghost.dead) {
      continue;
    }

    const ghostHitBox: Rectangle = getGhostHitBox(ghost.screenCoordinates);
    if (collide(pacManHitBox, ghostHitBox)) {
      ghostCollidesWithPacMan(ghost);
    }
  }
};

export const ghostCollidesWithPacMan = (ghost: Ghost) => {
  const game = ghost.game;
  game.pacMan.send('COLLISION_WITH_GHOST');
  ghost.send('COLLISION_WITH_PAC_MAN');
};

export const detectCollisions = (game: Game) => {
  if (game.pacMan.dead) {
    return;
  }

  detectPacManEatingPill(game);
  detectGhostCollisions(game);
};
