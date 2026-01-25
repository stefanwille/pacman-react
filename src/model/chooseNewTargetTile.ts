import {
  TileCoordinates,
  getPointDifferenceAsVector,
  addCoordinatesAndVector,
} from './Coordinates';
import { moveFromTile, isWayFreeInDirection, getNextTile } from './Ways';
import { getTileDistance } from './getTileDistance';
import { Directions, Direction } from './Types';
import { rotateVectorBy180Degrees } from './Vector';
import { assert } from '../util/assert';
import { GhostStateValue } from './store/types';

export interface GhostTargetingContext {
  ghost: {
    state: GhostStateValue;
    ghostNumber: number;
    tileCoordinates: TileCoordinates;
    direction: Direction;
    isInsideBoxWalls: boolean;
  };
  pacMan: {
    tileCoordinates: TileCoordinates;
    direction: Direction;
  };
  blinkyTileCoordinates: TileCoordinates;
}

export const TILE_FOR_LEAVING_THE_BOX: TileCoordinates = {
  x: 13,
  y: 11,
};

export const TILE_FOR_RETURNING_TO_BOX: TileCoordinates = {
  x: 14,
  y: 14,
};

export const SCATTER_TILE_FOR_GHOST_0: TileCoordinates = { x: 26, y: 1 };

export const chooseNewTargetTile = (ctx: GhostTargetingContext): TileCoordinates => {
  switch (ctx.ghost.state) {
    case 'scatter':
      return chooseInScatterMode(ctx);
    case 'chase':
      return choseInChaseMode(ctx);
    case 'frightened':
      return chooseInFrightenedMode(ctx);
    case 'dead':
      return chooseInDeadMode();
    default:
      throw new Error(`Bad state ${ctx.ghost.state}`);
  }
};

const chooseInScatterMode = (ctx: GhostTargetingContext): TileCoordinates => {
  if (ctx.ghost.isInsideBoxWalls) {
    return TILE_FOR_LEAVING_THE_BOX;
  }
  switch (ctx.ghost.ghostNumber) {
    case 0:
      return SCATTER_TILE_FOR_GHOST_0;
    case 1:
      return { x: 1, y: 1 };
    case 2:
      return { x: 26, y: 29 };
    case 3:
      return { x: 1, y: 29 };
    default:
      throw new Error(`Bad ghostNumber ${ctx.ghost.ghostNumber}`);
  }
};

const chooseForGhost0InChaseState = (ctx: GhostTargetingContext): TileCoordinates => {
  return ctx.pacMan.tileCoordinates;
};

const chooseForGhost1InChaseState = (ctx: GhostTargetingContext): TileCoordinates => {
  const fourTilesAhead = moveFromTile(
    ctx.pacMan.tileCoordinates,
    ctx.pacMan.direction,
    4
  );
  return ctx.pacMan.direction === 'UP'
    ? moveFromTile(fourTilesAhead, 'LEFT', 4)
    : fourTilesAhead;
};

const chooseForGhost2InChaseState = (ctx: GhostTargetingContext): TileCoordinates => {
  const intermediateTile = chooseGhost2IntermediateTile(ctx);
  const vectorToBlinky = getPointDifferenceAsVector(
    intermediateTile,
    ctx.blinkyTileCoordinates
  );
  const rotatedVector = rotateVectorBy180Degrees(vectorToBlinky);
  const newTile = addCoordinatesAndVector(intermediateTile, rotatedVector);

  return newTile;
};

export const chooseGhost2IntermediateTile = (ctx: GhostTargetingContext): TileCoordinates => {
  const twoTilesAhead = moveFromTile(
    ctx.pacMan.tileCoordinates,
    ctx.pacMan.direction,
    2
  );
  return ctx.pacMan.direction === 'UP'
    ? moveFromTile(twoTilesAhead, 'LEFT', 2)
    : twoTilesAhead;
};

const chooseForGhost3InChaseState = (ctx: GhostTargetingContext): TileCoordinates => {
  const distance = getTileDistance(
    ctx.ghost.tileCoordinates,
    ctx.pacMan.tileCoordinates
  );

  return distance >= 8 ? ctx.pacMan.tileCoordinates : chooseInScatterMode(ctx);
};

const choseInChaseMode = (ctx: GhostTargetingContext): TileCoordinates => {
  if (ctx.ghost.isInsideBoxWalls) {
    return TILE_FOR_LEAVING_THE_BOX;
  }
  switch (ctx.ghost.ghostNumber) {
    case 0:
      return chooseForGhost0InChaseState(ctx);
    case 1:
      return chooseForGhost1InChaseState(ctx);
    case 2:
      return chooseForGhost2InChaseState(ctx);
    case 3:
      return chooseForGhost3InChaseState(ctx);
    default:
      throw new Error(`Bad ghostNumber ${ctx.ghost.ghostNumber}`);
  }
};

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

const chooseInFrightenedMode = (ctx: GhostTargetingContext): TileCoordinates => {
  return chooseSomeRandomMovement(ctx);
};

/**
 * Choose a random neighbour tile that is not backward and not into a wall.
 */
const chooseSomeRandomMovement = (ctx: GhostTargetingContext): TileCoordinates => {
  const candidateDirections: Direction[] = Directions.filter(
    direction =>
      direction !== ctx.ghost.direction &&
      isWayFreeInDirection(ctx.ghost.tileCoordinates, direction)
  );
  assert(candidateDirections.length > 0);
  const newDirection =
    candidateDirections[getRandomInt(candidateDirections.length)];
  assert(newDirection);
  const randomNeighourTile = getNextTile(ctx.ghost.tileCoordinates, newDirection);

  return randomNeighourTile;
};

const chooseInDeadMode = (): TileCoordinates => {
  return TILE_FOR_RETURNING_TO_BOX;
};
