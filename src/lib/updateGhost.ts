import { chooseNewTargetTile } from './chooseNewTargetTile';
import { chooseNextTile } from './chooseNextTile';
import {
  TileCoordinates,
  MAZE_WIDTH_IN_SCREEN_COORDINATES,
  MAZE_HEIGHT_IN_SCREEN_COORDINATES,
} from './Coordinates';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost } from './Ghost';
import { Direction } from './Types';
import { DIRECTION_TO_DELTA, isTileCenter } from './Ways';
import { toJS } from 'mobx';

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
  }

  moveGhost(ghost);
};

const reRouteGhost = (ghost: Ghost) => {
  ghost.targetTile = chooseNewTargetTile(ghost);
  updateDirection(ghost);
};

const updateDirection = (ghost: Ghost) => {
  const newDirection = getNewDirection(ghost);
  ghost.direction = newDirection;
};

export const getNewDirection = (ghost: Ghost): Direction => {
  const currentTile = ghost.tileCoordinates;
  const currentDirection = ghost.direction;
  const targetTile = ghost.targetTile;
  const nextTile: TileCoordinates = chooseNextTile({
    currentTile,
    currentDirection,
    targetTile,
  });

  return getDirectionFromTileToTile(currentTile, nextTile);
};

const moveGhost = (ghost: Ghost) => {
  const delta = getGhostVelocity(ghost.direction);
  ghost.moveBy(delta);
};

const getGhostVelocity = (direction: Direction) => {
  return DIRECTION_TO_DELTA[direction];
};

const isGhostAtTileCenter = (ghost: Ghost): boolean => {
  return isTileCenter(ghost.screenCoordinates);
};
