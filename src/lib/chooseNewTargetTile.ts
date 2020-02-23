import { TileCoordinates } from './Coordinates';
import { Ghost } from './Ghost';

export const chooseNextTargetTile = (ghost: Ghost): TileCoordinates => {
  return ghost.scatterTile;
};
