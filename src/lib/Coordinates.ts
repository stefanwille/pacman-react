import { MAZE_WIDTH_IN_TILES, MAZE_HEIGHT_IN_TILES } from './MazeData';
import { assert } from '../util/assert';

interface Coordinates {
  x: number;
  y: number;
}

export type TileCoordinates = Coordinates;
export type ScreenCoordinates = Coordinates;

export const SCALE_FACTOR = 2.5;
export const TILE_SIZE = 8 * SCALE_FACTOR;

export const isTxValid = (tx: number) => tx >= 0 && tx < MAZE_WIDTH_IN_TILES;
export const isTyValid = (ty: number) => ty >= 0 && ty < MAZE_HEIGHT_IN_TILES;
export const isValidTileCoordinates = (tile: TileCoordinates) =>
  isTxValid(tile.x) && isTyValid(tile.y);

export const assertValidTx = (tx: number) => {
  assert(isTxValid(tx), `Invalid tx ${tx} ${MAZE_WIDTH_IN_TILES}`);
};

export const assertValidTy = (ty: number) => {
  assert(isTyValid(ty), `Invalid ty ${ty} ${MAZE_HEIGHT_IN_TILES}`);
};

export const assertValidTileCoordinates = (tile: TileCoordinates) => {
  assertValidTx(tile.x);
  assertValidTy(tile.y);
};

export const screenFromTileCoordinate = (tileCoordinate: number): number =>
  (tileCoordinate + 0.5) * TILE_SIZE;

export const tileFromScreenCoordinate = (screenCoordinate: number): number =>
  Math.floor(screenCoordinate / TILE_SIZE);

export const screenFromTile = (tile: TileCoordinates): ScreenCoordinates => ({
  x: screenFromTileCoordinate(tile.x),
  y: screenFromTileCoordinate(tile.y),
});

export const tileFromScreen = (screen: ScreenCoordinates): TileCoordinates => ({
  x: tileFromScreenCoordinate(screen.x),
  y: tileFromScreenCoordinate(screen.y),
});
