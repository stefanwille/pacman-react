import { Direction, assertValidDirection } from './Types';
import {
  assertValidTileCoordinates,
  ScreenCoordinates,
  TileCoordinates,
  SCREEN_TILE_SIZE,
  rectangleContainsTile,
  TileRectangle,
  wrapTileToBounds,
  MAZE_DIMENSIONS_IN_TILES,
  addCoordinatesAndVector,
} from './Coordinates';
import { waysMatrix, WAY_FREE_ID, BOX_DOOR_ID } from './MazeData';
import { Vector, multiplyVector } from './Vector';

const BOX_TILE_COORDINATES: TileRectangle = {
  tile1: { x: 10, y: 12 },
  tile2: { x: 17, y: 16 },
};

const BOX_SPACE_TILE_COORDINATES: TileRectangle = {
  tile1: { x: 12, y: 14 },
  tile2: { x: 15, y: 14 },
};

export const isWayFreeAt = (tile: TileCoordinates): boolean => {
  assertValidTileCoordinates(tile);
  return waysMatrix[tile.y][tile.x] === WAY_FREE_ID;
};

export const isBoxDoorAt = (tile: TileCoordinates): boolean => {
  assertValidTileCoordinates(tile);
  return waysMatrix[tile.y][tile.x] === BOX_DOOR_ID;
};

export const isTileInBox = (tile: TileCoordinates): boolean =>
  rectangleContainsTile(BOX_TILE_COORDINATES, tile);

export const isTileInBoxSpace = (tile: TileCoordinates): boolean =>
  rectangleContainsTile(BOX_SPACE_TILE_COORDINATES, tile);

export const isTileCenter = (screen: ScreenCoordinates): boolean => {
  return screen.x % SCREEN_TILE_SIZE === 0 && screen.y % SCREEN_TILE_SIZE === 0;
};

export const DIRECTION_TO_VECTOR: Record<Direction, Vector> = {
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
};

export const directionToVector = (direction: Direction, distance = 1): Vector =>
  multiplyVector(distance, DIRECTION_TO_VECTOR[direction]);

export const moveFromTile = (
  tile: TileCoordinates,
  direction: Direction,
  steps = 1
) => {
  const step = DIRECTION_TO_VECTOR[direction];
  const newTile = { x: tile.x + step.x * steps, y: tile.y + step.y * steps };
  return newTile;
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
  assertValidDirection(direction);
  const vector: Vector = DIRECTION_TO_TILE_VECTOR[direction];
  const scaledVector = multiplyVector(stepSize, vector);
  const movedTile = addCoordinatesAndVector(tile, scaledVector);
  const nextTile = wrapTileToBounds(movedTile, MAZE_DIMENSIONS_IN_TILES);
  return nextTile;
};

const DIRECTION_TO_TILE_VECTOR = {
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
};
