import { isEqual } from 'lodash';
import { getTargetTileInScatterMode } from './chooseNewTargetTile';
import { TileCoordinates } from './Coordinates';
import { findWay } from './findWay';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost, GhostDirection } from './Ghost';
import { DIRECTION_TO_DELTA, isTileCenter } from './Ways';

export const updateGhost = ({
  ghost,
  timestamp,
}: {
  ghost: Ghost;
  timestamp: number;
}) => {
  ghost.timestamp = timestamp;

  if (ghost.ghostPaused) {
    return;
  }

  if (isGhostAtTileCenter(ghost)) {
    reRouteGhost(ghost);
    updateDirection(ghost);
  }

  const delta = getGhostVelocity(ghost.direction);
  ghost.moveBy(delta);
};

const updateDirection = (ghost: Ghost) => {
  const newDirection = getNewDirection(ghost);
  ghost.direction = newDirection;
};

const getNewDirection = (ghost: Ghost): GhostDirection => {
  const currentTile = ghost.tileCoordinates;
  const wayPoints = ghost.wayPoints;

  if (!wayPoints) {
    return 'STANDSTILL';
  }

  const nextTile: TileCoordinates | null = findNextTile({
    currentTile,
    wayPoints,
  });
  if (!nextTile) {
    return 'STANDSTILL';
  }

  return getDirectionFromTileToTile(currentTile, nextTile);
};

const getGhostVelocity = (direction: GhostDirection) => {
  return DIRECTION_TO_DELTA[direction];
};

const isGhostAtTileCenter = (ghost: Ghost): boolean => {
  return isTileCenter(ghost.screenCoordinates);
};

const getNewDestination = (ghost: Ghost): TileCoordinates => {
  switch (ghost.state) {
    case 'chase':
      return ghost.game.pacMan.tileCoordinates;
    case 'scatter':
      return getTargetTileInScatterMode(ghost);
    default:
      throw new Error(`State ${ghost.state}`);
  }
};

export const findNextTile = ({
  currentTile,
  wayPoints,
}: {
  currentTile: TileCoordinates;
  wayPoints: TileCoordinates[];
}): TileCoordinates | null => {
  const indexOfCurrentTile = wayPoints.findIndex(wayPoint =>
    isEqual(wayPoint, currentTile)
  );
  if (indexOfCurrentTile + 1 >= wayPoints.length) {
    return null;
  }
  return wayPoints[indexOfCurrentTile + 1];
};

const reRouteGhost = (ghost: Ghost) => {
  const currentTile = ghost.tileCoordinates;
  const destination: TileCoordinates = getNewDestination(ghost);

  ghost.wayPoints = findWay(currentTile, destination, ghost.direction);
  if (!ghost.wayPoints) {
    return;
  }
};
