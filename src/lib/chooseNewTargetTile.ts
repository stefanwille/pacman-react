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
  switch (ghost.ghostNumber) {
    case 0:
      return { x: 26, y: 1 };
    case 1:
      return { x: 1, y: 1 };
    case 2:
      return { x: 26, y: 29 };
    case 3:
      return { x: 1, y: 29 };
    default:
      throw new Error(`Bad ghostNumber ${ghost.ghostNumber}`);
  }
};

export const getTargetTileInChaseMode = (ghost: Ghost): TileCoordinates => {
  switch (ghost.ghostNumber) {
    case 0:
      return ghost.game.pacMan.tileCoordinates;
    default:
      throw new Error(`Bad ghostNumber ${ghost.ghostNumber}`);
  }
};
