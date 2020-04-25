import { MAZE_WIDTH_IN_TILES, MAZE_HEIGHT_IN_TILES } from './MazeData';
import { assert } from '../util/assert';
import { Vector } from './Vector';

export type Coordinate = number;

export type TileCoordinate = Coordinate;
export type ScreenCoordinate = Coordinate;

export interface TileCoordinates {
  x: TileCoordinate;
  y: TileCoordinate;
}

export interface ScreenCoordinates {
  x: ScreenCoordinate;
  y: ScreenCoordinate;
}

export type Coordinates = TileCoordinates | ScreenCoordinates;

export interface TileRectangle {
  tile1: TileCoordinates;
  tile2: TileCoordinates;
}

export const SCALE_FACTOR = 2.5;
export const SPRITE_TILE_SIZE = 8;
export const SCREEN_TILE_SIZE = SPRITE_TILE_SIZE * SCALE_FACTOR;
export const SCREEN_TILE_CENTER = SCREEN_TILE_SIZE / 2;

export const SCREEN_TILE_CENTER_VECTOR: Vector = {
  x: SCREEN_TILE_CENTER,
  y: SCREEN_TILE_CENTER,
};

export const MAZE_WIDTH_IN_SCREEN_COORDINATES =
  MAZE_WIDTH_IN_TILES * SCREEN_TILE_SIZE;
export const MAZE_HEIGHT_IN_SCREEN_COORDINATES =
  MAZE_HEIGHT_IN_TILES * SCREEN_TILE_SIZE;

export const MAZE_DIMENSIONS_IN_TILES: TileCoordinates = {
  x: MAZE_WIDTH_IN_TILES,
  y: MAZE_HEIGHT_IN_TILES,
};

export const isTxValid = (tx: TileCoordinate) =>
  tx >= 0 && tx < MAZE_WIDTH_IN_TILES;
export const isTyValid = (ty: TileCoordinate) =>
  ty >= 0 && ty < MAZE_HEIGHT_IN_TILES;
export const isValidTileCoordinates = (tile: TileCoordinates) =>
  isTxValid(tile.x) && isTyValid(tile.y);

export const assertValidTx = (tx: TileCoordinate) => {
  assert(isTxValid(tx), `Invalid t.x ${tx} width: ${MAZE_WIDTH_IN_TILES}`);
};

export const assertValidTy = (ty: TileCoordinate) => {
  assert(isTyValid(ty), `Invalid t.y ${ty} height: ${MAZE_HEIGHT_IN_TILES}`);
};

export const assertValidTileCoordinates = (tile: TileCoordinates) => {
  assertValidTx(tile.x);
  assertValidTy(tile.y);
};

export const screenFromTileCoordinate = (
  tileCoordinate: TileCoordinate
): ScreenCoordinate => tileCoordinate * SCREEN_TILE_SIZE;

export const tileFromScreenCoordinate = (
  screenCoordinate: ScreenCoordinate
): TileCoordinate => Math.floor(screenCoordinate / SCREEN_TILE_SIZE);

export const screenFromTile = (tile: TileCoordinates): ScreenCoordinates => ({
  x: screenFromTileCoordinate(tile.x),
  y: screenFromTileCoordinate(tile.y),
});

export const tileFromScreen = (screen: ScreenCoordinates): TileCoordinates => ({
  x: tileFromScreenCoordinate(screen.x),
  y: tileFromScreenCoordinate(screen.y),
});

export const getPointDifferenceAsVector = (
  from: Coordinates,
  to: Coordinates
): Vector => ({
  x: to.x - from.x,
  y: to.y - from.y,
});

export const addCoordinatesAndVector = (
  coordinates: Coordinates,
  vector: Vector
): ScreenCoordinates => ({
  x: coordinates.x + vector.x,
  y: coordinates.y + vector.y,
});

export const rectangleContainsTile = (
  tileRectangle: TileRectangle,
  tile: TileCoordinates
): boolean =>
  tile.x >= tileRectangle.tile1.x &&
  tile.x <= tileRectangle.tile2.x &&
  tile.y >= tileRectangle.tile1.y &&
  tile.y <= tileRectangle.tile2.y;

export const wrapTileToBounds = (
  tile: TileCoordinates,
  bounds: TileCoordinates
): TileCoordinates => {
  const wrappedX = (tile.x + bounds.x) % bounds.x;
  const wrappedY = (tile.y + bounds.y) % bounds.y;
  return { x: wrappedX, y: wrappedY };
};
