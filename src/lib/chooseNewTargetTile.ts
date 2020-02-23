import { TileCoordinates } from './Coordinates';
import { Ghost } from './Ghost';

export const chooseNextTargetTile = (ghost: Ghost): TileCoordinates => {
  switch (ghost.state) {
    case 'scatter':
      return getTargetTileInScatterMode(ghost);
    case 'chase':
      return getTargetTileInChaseMode(ghost);
    default:
      throw new Error(`Bad state ${ghost.state}`);
  }
};

export const getTargetTileInScatterMode = (ghost: Ghost): TileCoordinates => {
  return ghost.scatterTile;
};

export const getTargetTileInChaseMode = (ghost: Ghost): TileCoordinates => {
  switch (ghost.ghostNumber) {
    case 0:
      return ghost.game.pacMan.tileCoordinates;
    default:
      throw new Error(`Bad name ${ghost.color}`);
  }
};
