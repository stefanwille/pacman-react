import { chooseNewTargetTile } from './chooseNewTargetTile';
import { chooseNextTile } from './chooseNextTile';
import { TileCoordinates } from './Coordinates';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost } from './Ghost';
import { Direction } from './Types';
import { directionToVector } from './Ways';
import { updateGhostPhaseTime, updateGhostPhase } from './updateGhostPhase';
import { Vector } from './Vector';
import { toJS } from 'mobx';

export const updateGhost = ({ ghost }: { ghost: Ghost }) => {
  if (ghost.ghostPaused) {
    return;
  }

  updateGhostPhaseTime(ghost);

  if (ghost.atTileCenter) {
    updateGhostPhase(ghost);
  }

  routeAndMoveGhost(ghost);
};

export const routeAndMoveGhost = (ghost: Ghost) => {
  if (ghost.atTileCenter) {
    if (ghost.dead) {
      console.log(ghost.ghostNumber, 'is dead - rerouting');
    }
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
  if (ghost.dead) {
    console.log(ghost.ghostNumber, 'is dead - chooseNextTile', nextTile);
    console.log('currentTile', toJS(currentTile));
    console.log('currentDirection', toJS(currentDirection));
    console.log('targetTile', toJS(targetTile));
    console.log('boxDoorIsOpen', toJS(boxDoorIsOpen));
  }

  return getDirectionFromTileToTile(currentTile, nextTile);
};

const moveGhost = (ghost: Ghost) => {
  const vector: Vector = getGhostMovementVector(ghost);
  ghost.moveBy(vector);
};

const isInTunnel = (tile: TileCoordinates) =>
  tile.y === 14 && (tile.x >= 22 || tile.x <= 5);

const getGhostMovementVector = (ghost: Ghost): Vector => {
  let speedFactor = 1;
  if (isInTunnel(ghost.tileCoordinates) || ghost.state === 'frightened') {
    // Half speed
    speedFactor = 0.5;
  } else if (ghost.dead) {
    // High speed
    speedFactor = 2;
  }

  const velocity = directionToVector(
    ghost.direction,
    ghost.game.speed * speedFactor
  );
  return velocity;
};
