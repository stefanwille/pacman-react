export type Coordinates = [number, number];

export const SCALE_FACTOR = 2.5;
export const TILE_SIZE = 8 * SCALE_FACTOR;

export const screenFromTileCoordinate = (tileCoordinate: number): number =>
  (tileCoordinate + 0.5) * TILE_SIZE;

export const screenFromTileCoordinates = (tx: number, ty: number) => [
  screenFromTileCoordinate(tx),
  screenFromTileCoordinate(ty),
];

export const tileFromScreenCoordinate = (screenCoordinate: number): number =>
  Math.floor(screenCoordinate / TILE_SIZE);

export const tileFromScreenCoordinates = (
  sx: number,
  sy: number
): Coordinates => [tileFromScreenCoordinate(sx), tileFromScreenCoordinate(sy)];
