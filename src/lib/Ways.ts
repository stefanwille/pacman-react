import * as _ from 'lodash';
import { Direction, Directions, SPEED } from '../components/Types';
import {
  assertValidTileCoordinates,
  TILE_SIZE,
  TileCoordinates,
  isValidTileCoordinates,
  ScreenCoordinates,
} from './Coordinates';
import {
  MAZE_HEIGHT_IN_TILES,
  MAZE_WIDTH_IN_TILES,
  waysMatrix,
  WAY_FREE_ID,
} from './MazeData';

export const isWayFreeAt = (tile: TileCoordinates): boolean => {
  assertValidTileCoordinates(tile);
  return waysMatrix[tile.y][tile.x] === WAY_FREE_ID;
};

const TILE_CENTER_OFFSET = TILE_SIZE / 2;

export const isTileCenter = (screen: ScreenCoordinates): boolean => {
  return (
    (screen.x - TILE_CENTER_OFFSET) % TILE_SIZE === 0 &&
    (screen.y - TILE_CENTER_OFFSET) % TILE_SIZE === 0
  );
};

export const DIRECTION_TO_DELTA = {
  RIGHT: { x: SPEED, y: 0 },
  LEFT: { x: -SPEED, y: 0 },
  UP: { x: 0, y: -SPEED },
  DOWN: { x: 0, y: SPEED },
  STANDSTILL: { x: 0, y: 0 },
};

export const DIRECTION_TO_OPPOSITE_DIRECTION: Record<Direction, Direction> = {
  RIGHT: 'LEFT',
  LEFT: 'RIGHT',
  UP: 'DOWN',
  DOWN: 'UP',
};

export const isWayFreeInDirection = (
  tile: TileCoordinates,
  direction: Direction,
  stepSize = 1
): boolean => {
  const nextTile = getNextTile(tile, direction, stepSize);
  return isWayFreeAt(nextTile);
};

export const getNextTile = (
  tile: TileCoordinates,
  direction: Direction,
  stepSize = 1
): TileCoordinates => {
  const [dx, dy] = DIRECTION_TO_TILE_OFFSET[direction];
  const nextTx = tile.x + dx * stepSize;
  const nextTy = tile.y + dy * stepSize;
  return { x: nextTx, y: nextTy };
};

const DIRECTION_TO_TILE_OFFSET = {
  RIGHT: [1, 0],
  LEFT: [-1, 0],
  UP: [0, -1],
  DOWN: [0, 1],
};

export const findWay = (
  origin: TileCoordinates,
  destination: TileCoordinates
): TileCoordinates[] | null => {
  if (!isWayFreeAt(origin)) {
    return null;
  }
  if (!isWayFreeAt(destination)) {
    return null;
  }

  const frontier: TileCoordinates[] = [];
  const comesFrom: TileCoordinates[][] = [];
  for (let ty = 0; ty < MAZE_HEIGHT_IN_TILES; ty++) {
    for (let tx = 0; tx < MAZE_WIDTH_IN_TILES; tx++) {
      const row = Array(MAZE_WIDTH_IN_TILES).fill(null);
      comesFrom.push(row);
    }
  }

  frontier.push(origin);
  comesFrom[origin.y][origin.x] = origin;
  while (frontier.length > 0) {
    const current: TileCoordinates | undefined = frontier.shift();
    if (!current) {
      // No way to the destination found
      return null;
    }

    if (_.isEqual(current, destination)) {
      // We have arrived at the destination
      break;
    }

    for (const direction of Directions) {
      const next = getNextTile(current, direction);
      if (!isValidTileCoordinates(next)) {
        continue;
      }

      if (!isWayFreeAt(next)) {
        // Is this way free?
        continue;
      }
      // Has another way arrived at these coordinate before?
      if (comesFrom[next.y][next.x]) {
        continue;
      }

      // Extend the frontier with this candidate
      frontier.push(next);
      // and track where it came from
      comesFrom[next.y][next.x] = current;
    }
  }

  // Walk back from destination to origin
  const way: TileCoordinates[] = [];
  let current: TileCoordinates = destination;
  while (!_.isEqual(current, origin)) {
    way.unshift(current);
    current = comesFrom[current.y][current.x];
    if (!current) {
      throw new Error('current not set');
    }
  }
  way.unshift(origin);

  return way;
};
