import { chooseNewTargetTile } from './chooseNewTargetTile';
import { chooseNextTile } from './chooseNextTile';
import { ScreenCoordinates, TileCoordinates } from './Coordinates';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost } from './Ghost';
import { Direction } from './Types';
import { isTileCenter, directionToVector } from './Ways';
import { updateGhostPhaseTime, updateGhostPhase } from './updateGhostPhase';

export const updateGhost = ({ ghost }: { ghost: Ghost }) => {
  if (ghost.ghostPaused) {
    return;
  }

  updateGhostPhaseTime(ghost);

  if (isGhostAtTileCenter(ghost)) {
    updateGhostPhase(ghost);
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
  const delta = getGhostVelocity(ghost);
  ghost.moveBy(delta);
};

const divideVector = (vector: ScreenCoordinates, divisor: number) => ({
  x: vector.x / divisor,
  y: vector.y / divisor,
});

const isInTunnel = (tile: TileCoordinates) =>
  tile.y === 14 && (tile.x >= 22 || tile.x <= 5);

const getGhostVelocity = (ghost: Ghost) => {
  let delta = directionToVector(ghost.direction, ghost.game.speed);
  if (isInTunnel(ghost.tileCoordinates)) {
    // Half speed
    delta = divideVector(delta, 2);
  }
  return delta;
};

const isGhostAtTileCenter = (ghost: Ghost): boolean => {
  return isTileCenter(ghost.screenCoordinates);
};
