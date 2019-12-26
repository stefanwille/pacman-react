export type Coordinates = [number, number];

export const TILE_SIZE = 24;

export const screenCoordinateFromTileCoordinate = (
  tileCoordinate: number
): number => (tileCoordinate + 0.5) * TILE_SIZE;

export const screenCoordinatesFromTileCoordinates = ([tx, ty]: Coordinates) => [
  screenCoordinateFromTileCoordinate(tx),
  screenCoordinateFromTileCoordinate(ty)
];

export const tileCoordinateFromScreenCoordinate = (
  screenCoordinate: number
): number => Math.floor(screenCoordinate / TILE_SIZE);

export const tileCoordinatesFromScreenCoordinates = ([
  sx,
  sy
]: Coordinates): Coordinates => [
  tileCoordinateFromScreenCoordinate(sx),
  tileCoordinateFromScreenCoordinate(sy)
];
