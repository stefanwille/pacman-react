import { Direction, SPEED } from './Types';
import {
  assertValidTileCoordinates,
  ScreenCoordinates,
  TileCoordinates,
  TILE_SIZE,
} from './Coordinates';
import { waysMatrix, WAY_FREE_ID } from './MazeData';

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

export const DIRECTION_TO_DELTA: Record<Direction, ScreenCoordinates> = {
  RIGHT: { x: SPEED, y: 0 },
  LEFT: { x: -SPEED, y: 0 },
  UP: { x: 0, y: -SPEED },
  DOWN: { x: 0, y: SPEED },
};

export const DIRECTION_TO_OPPOSITE_DIRECTION: Record<Direction, Direction> = {
  RIGHT: 'LEFT',
  LEFT: 'RIGHT',
  UP: 'DOWN',
  DOWN: 'UP',
};

export const isOppositeDirection = (
  direction1: Direction,
  direction2: Direction
) => {
  return DIRECTION_TO_OPPOSITE_DIRECTION[direction1] === direction2;
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
