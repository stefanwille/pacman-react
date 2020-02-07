import { Direction, Directions } from '../components/Types';
import { Coordinates } from './Coordinates';
import {
  waysMatrix,
  WAY_FREE_ID,
  MAZE_WIDTH_IN_TILES,
  MAZE_HEIGHT_IN_TILES,
} from './MazeData';
import * as _ from 'lodash';
import { assert } from './assert';

export const isTxValid = (tx: number) => tx >= 0 && tx < MAZE_WIDTH_IN_TILES;
export const isTyValid = (ty: number) => ty >= 0 && ty < MAZE_HEIGHT_IN_TILES;

export const assertValidTx = (tx: number) => {
  assert(isTxValid(tx), `Invalid tx ${tx} ${MAZE_WIDTH_IN_TILES}`);
};

export const assertValidTy = (ty: number) => {
  assert(isTyValid(ty), `Invalid ty ${ty} ${MAZE_HEIGHT_IN_TILES}`);
};

export const assertValidTileCoordinates = (tx: number, ty: number) => {
  assertValidTx(tx);
  assertValidTy(ty);
};

export const isWayFreeAt = (tx: number, ty: number): boolean => {
  assertValidTileCoordinates(tx, ty);
  return waysMatrix[ty][tx] === WAY_FREE_ID;
};

export const isWayFreeInDirection = (
  tx: number,
  ty: number,
  direction: Direction,
  stepSize = 1
): boolean => {
  const [nextTileX, nextTileY] = nextTile(tx, ty, direction, stepSize);
  return isWayFreeAt(nextTileX, nextTileY);
};

const nextTile = (
  tx: number,
  ty: number,
  direction: Direction,
  stepSize = 1
): Coordinates => {
  const [dx, dy] = DIRECTION_TO_TILE_OFFSET[direction];
  const nextTx = tx + dx * stepSize;
  const nextTy = ty + dy * stepSize;
  return [nextTx, nextTy];
};

const DIRECTION_TO_TILE_OFFSET = {
  RIGHT: [1, 0],
  LEFT: [-1, 0],
  UP: [0, -1],
  DOWN: [0, 1],
};

export const findWay = (
  origin: Coordinates,
  destination: Coordinates
): Coordinates[] | null => {
  if (!isWayFreeAt(origin[0], origin[1])) {
    return null;
  }
  if (!isWayFreeAt(destination[0], destination[1])) {
    return null;
  }

  const frontier: Coordinates[] = [];
  const comesFrom: Coordinates[][] = [];
  for (let ty = 0; ty < MAZE_HEIGHT_IN_TILES; ty++) {
    for (let tx = 0; tx < MAZE_WIDTH_IN_TILES; tx++) {
      const row = Array(MAZE_WIDTH_IN_TILES).fill(null);
      comesFrom.push(row);
    }
  }

  frontier.push(origin);
  comesFrom[origin[1]][origin[0]] = origin;
  while (frontier.length > 0) {
    const current: Coordinates | undefined = frontier.shift();
    if (!current) {
      // No way to the destination found
      return null;
    }

    if (_.isEqual(current, destination)) {
      // We have arrived at the destination
      break;
    }

    for (const direction of Directions) {
      const next = nextTile(current[0], current[1], direction);
      // Is this way free?
      if (!isWayFreeAt(next[0], next[1])) {
        continue;
      }
      // Has another way arrived at these coordinate before?
      if (comesFrom[next[1]][next[0]]) {
        continue;
      }

      // Extend the frontier with this candidate
      frontier.push(next);
      // and track where it came from
      comesFrom[next[1]][next[0]] = current;
    }
  }

  // Walk back from destination to origin
  const way: Coordinates[] = [];
  let current: Coordinates = destination;
  while (!_.isEqual(current, origin)) {
    way.unshift(current);
    current = comesFrom[current[1]][current[0]];
    if (!current) {
      throw new Error('current not set');
    }
  }
  way.unshift(origin);

  return way;
};
