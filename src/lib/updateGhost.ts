import { chooseNewTargetTile } from './chooseNewTargetTile';
import { chooseNextTile } from './chooseNextTile';
import { TileCoordinates } from './Coordinates';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost } from './Ghost';
import { Direction } from './Types';
import { isTileCenter, directionToVector } from './Ways';
import { updateGhostPhaseTime, updateGhostPhase } from './updateGhostPhase';
import { divideVector, multiplyVector, Vector } from './Vector';

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
  const boxDoorIsOpen = ghost.canPassThroughBoxDoor;
  const nextTile: TileCoordinates = chooseNextTile({
    currentTile,
    currentDirection,
    targetTile,
    boxDoorIsOpen,
  });

  return getDirectionFromTileToTile(currentTile, nextTile);
};

const moveGhost = (ghost: Ghost) => {
  const delta = getGhostVelocity(ghost);
  ghost.moveBy(delta);
};

const isInTunnel = (tile: TileCoordinates) =>
  tile.y === 14 && (tile.x >= 22 || tile.x <= 5);

const getGhostVelocity = (ghost: Ghost): Vector => {
  let speedFactor = 1;
  if (isInTunnel(ghost.tileCoordinates) || ghost.state === 'frightened') {
    // Half speed
    speedFactor = 0.5;
  } else if (ghost.dead) {
    // High speed
    speedFactor = 3;
  }

  const velocity = directionToVector(
    ghost.direction,
    ghost.game.speed * speedFactor
  );
  return velocity;
};

const isGhostAtTileCenter = (ghost: Ghost): boolean => {
  return isTileCenter(ghost.screenCoordinates);
};
