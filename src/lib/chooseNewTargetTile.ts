import { TileCoordinates } from './Coordinates';
import { Ghost } from './Ghost';
import { moveFromTile } from './Ways';
import { getTileDistance } from './getTileDistance';

export const chooseNewTargetTile = (ghost: Ghost): TileCoordinates => {
  switch (ghost.state) {
    case 'scatter':
      return chooseInScatterMode(ghost);
    case 'chase':
      return choseInChaseMode(ghost);
    default:
      throw new Error(`Bad state ${ghost.state}`);
  }
};

const chooseInScatterMode = (ghost: Ghost): TileCoordinates => {
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

const chooseForGhost0InChaseState = (ghost: Ghost): TileCoordinates => {
  const pacMan = ghost.game.pacMan;
  return pacMan.tileCoordinates;
};

const chooseForGhost1InChaseState = (ghost: Ghost): TileCoordinates => {
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

const chooseForGhost3InChaseState = (ghost: Ghost): TileCoordinates => {
  const pacMan = ghost.game.pacMan;
  const distance = getTileDistance(
    ghost.tileCoordinates,
    pacMan.tileCoordinates
  );

  return distance >= 8 ? pacMan.tileCoordinates : chooseInScatterMode(ghost);
};

const choseInChaseMode = (ghost: Ghost): TileCoordinates => {
  switch (ghost.ghostNumber) {
    case 0:
      return chooseForGhost0InChaseState(ghost);
    case 1:
      return chooseForGhost1InChaseState(ghost);
    case 2:
      return ghost.game.pacMan.tileCoordinates;
    case 3:
      return chooseForGhost3InChaseState(ghost);
    default:
      throw new Error(`Bad ghostNumber ${ghost.ghostNumber}`);
  }
};
