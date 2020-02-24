import { TileCoordinates } from './Coordinates';

export const getTileDistance = (
  neighbourTile: TileCoordinates,
  targetTile: TileCoordinates
) => {
  const dx = Math.abs(neighbourTile.x - targetTile.x);
  const dy = Math.abs(neighbourTile.y - targetTile.y);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};
