import { Direction } from '../components/Types';
import { Coordinates } from './Coordinates';
import { waysMatrix, WAY_FREE_ID } from './MazeData';

export const isWayFreeAt = (tx: number, ty: number): boolean => {
  return waysMatrix[ty][tx] === WAY_FREE_ID;
};

export const isWayFreeInDirection = (
  tx: number,
  ty: number,
  direction: Direction
): boolean => {
  const [nextTileX, nextTileY] = nextTile(tx, ty, direction);
  return isWayFreeAt(nextTileX, nextTileY);
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

const DIRECTION_TO_TILE_OFFSET = {
  RIGHT: [1, 0],
  LEFT: [-1, 0],
  UP: [0, -1],
  DOWN: [0, 1],
};

export const findWay = (
  origin: Coordinates,
  destination: Coordinates
): Coordinates[] => {
  return [origin, destination];
};
