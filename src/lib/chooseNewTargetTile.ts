import { TileCoordinates } from './Coordinates';
import { Ghost } from './Ghost';
import { moveFromTile } from './Ways';
import { getTileDistance } from './getTileDistance';

export const chooseNewTargetTile = (ghost: Ghost): TileCoordinates => {
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

const getGhost0ChaseTargetTile = (ghost: Ghost): TileCoordinates => {
  const pacMan = ghost.game.pacMan;
  return pacMan.tileCoordinates;
};

const getGhost1ChaseTargetTile = (ghost: Ghost): TileCoordinates => {
  const pacMan = ghost.game.pacMan;
  const fourTilesAhead = moveFromTile(
    pacMan.tileCoordinates,
    pacMan.direction,
    4
  );
  return pacMan.direction === 'UP'
    ? moveFromTile(fourTilesAhead, 'LEFT', 4)
    : fourTilesAhead;
};

const getGhost3ChaseTargetTile = (ghost: Ghost): TileCoordinates => {
  const pacMan = ghost.game.pacMan;
  const distance = getTileDistance(
    ghost.tileCoordinates,
    pacMan.tileCoordinates
  );

  return distance >= 8
    ? pacMan.tileCoordinates
    : getTargetTileInScatterMode(ghost);
};

export const getTargetTileInChaseMode = (ghost: Ghost): TileCoordinates => {
  switch (ghost.ghostNumber) {
    case 0:
      return getGhost0ChaseTargetTile(ghost);
    case 1:
      return getGhost1ChaseTargetTile(ghost);
    case 2:
      return ghost.game.pacMan.tileCoordinates;
    case 3:
      return getGhost3ChaseTargetTile(ghost);
    default:
      throw new Error(`Bad ghostNumber ${ghost.ghostNumber}`);
  }
};
