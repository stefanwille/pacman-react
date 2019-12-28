export type Coordinates = [number, number];

export const SCALE_FACTOR = 2.5;
export const TILE_SIZE = 8 * SCALE_FACTOR;

export const screenCoordinateFromTileCoordinate = (
  tileCoordinate: number
): number => (tileCoordinate + 0.5) * TILE_SIZE;

export const screenCoordinatesFromTileCoordinates = (
  tx: number,
  ty: number
) => [
  screenCoordinateFromTileCoordinate(tx),
  screenCoordinateFromTileCoordinate(ty)
];

export const tileCoordinateFromScreenCoordinate = (
  screenCoordinate: number
): number => Math.floor(screenCoordinate / TILE_SIZE);

export const tileCoordinatesFromScreenCoordinates = (
  sx: number,
  sy: number
): Coordinates => [
  tileCoordinateFromScreenCoordinate(sx),
  tileCoordinateFromScreenCoordinate(sy)
];
