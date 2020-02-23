import { MAZE_WIDTH_IN_TILES, MAZE_HEIGHT_IN_TILES } from './MazeData';
import { assert } from '../util/assert';

export type TileCoordinate = number;
export type ScreenCoordinate = number;

export interface TileCoordinates {
  x: TileCoordinate;
  y: TileCoordinate;
}

export interface ScreenCoordinates {
  x: ScreenCoordinate;
  y: ScreenCoordinate;
}

export const SCALE_FACTOR = 2.5;
export const TILE_SIZE = 8 * SCALE_FACTOR;

export const isTxValid = (tx: TileCoordinate) =>
  tx >= 0 && tx < MAZE_WIDTH_IN_TILES;
export const isTyValid = (ty: TileCoordinate) =>
  ty >= 0 && ty < MAZE_HEIGHT_IN_TILES;
export const isValidTileCoordinates = (tile: TileCoordinates) =>
  isTxValid(tile.x) && isTyValid(tile.y);

export const assertValidTx = (tx: TileCoordinate) => {
  assert(isTxValid(tx), `Invalid t.x ${tx} ${MAZE_WIDTH_IN_TILES}`);
};

export const assertValidTy = (ty: TileCoordinate) => {
  assert(isTyValid(ty), `Invalid t.y ${ty} ${MAZE_HEIGHT_IN_TILES}`);
};

export const assertValidTileCoordinates = (tile: TileCoordinates) => {
  assertValidTx(tile.x);
  assertValidTy(tile.y);
};

export const screenFromTileCoordinate = (
  tileCoordinate: TileCoordinate
): ScreenCoordinate => (tileCoordinate + 0.5) * TILE_SIZE;

export const tileFromScreenCoordinate = (
  screenCoordinate: ScreenCoordinate
): TileCoordinate => Math.floor(screenCoordinate / TILE_SIZE);

export const screenFromTile = (tile: TileCoordinates): ScreenCoordinates => ({
  x: screenFromTileCoordinate(tile.x),
  y: screenFromTileCoordinate(tile.y),
});

export const tileFromScreen = (screen: ScreenCoordinates): TileCoordinates => ({
  x: tileFromScreenCoordinate(screen.x),
  y: tileFromScreenCoordinate(screen.y),
});
