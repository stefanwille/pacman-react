import { minBy } from 'lodash';
import { isValidTileCoordinates, TileCoordinates } from './Coordinates';
import { Direction, Directions } from './Types';
import {
  getNextTile,
  isOppositeDirection,
  isWayFreeAt,
  isBoxDoorAt,
} from './Ways';
import { getTileDistance } from './getTileDistance';
import { toJS } from 'mobx';
import { assert } from '../util/assert';

interface CandidateTile {
  tile: TileCoordinates;
  distanceToTarget: number;
}

export const chooseNextTile = ({
  currentTile,
  currentDirection,
  targetTile,
  boxDoorIsOpen,
}: {
  currentTile: TileCoordinates;
  currentDirection: Direction;
  targetTile: TileCoordinates;
  boxDoorIsOpen: boolean;
}): TileCoordinates => {
  assert(isValidTileCoordinates(currentTile), `${toJS(currentTile)}`);
  const bestNextTile = chooseBestNextTile({
    currentTile,
    currentDirection,
    targetTile,
    boxDoorIsOpen,
  });

  if (bestNextTile) {
    assert(isValidTileCoordinates(bestNextTile));
    return bestNextTile;
  }

  const anyNextTile = chooseAnyNextTile({
    currentTile,
    currentDirection,
    boxDoorIsOpen,
  });
  if (anyNextTile) {
    assert(isValidTileCoordinates(anyNextTile));
    return anyNextTile;
  }

  console.error('currentTile', currentTile);
  console.error('currentDirection', currentDirection);
  console.error('boxDoorIsOpen', boxDoorIsOpen);
  console.error('targetTile', toJS(targetTile));

  throw new Error(`Found no candidate at ${JSON.stringify(currentTile)}`);
};

const chooseBestNextTile = ({
  currentTile,
  currentDirection,
  targetTile,
  boxDoorIsOpen,
}: {
  currentTile: TileCoordinates;
  currentDirection: Direction;
  targetTile: TileCoordinates;
  boxDoorIsOpen: boolean;
}): TileCoordinates | null => {
  const candidates = [] as CandidateTile[];
  for (const direction of Directions) {
    // Prevent the ghost from going backwards
    if (isOppositeDirection(direction, currentDirection)) {
      continue;
    }
    const neighbourTile = getNextTile(currentTile, direction);

    if (!possibleNextTile(neighbourTile, boxDoorIsOpen)) {
      continue;
    }

    const distanceToTarget = getTileDistance(neighbourTile, targetTile);
    candidates.push({ tile: neighbourTile, distanceToTarget });
  }

  const bestCandidate = minBy(candidates, 'distanceToTarget');
  if (bestCandidate) {
    return bestCandidate.tile;
  } else {
    return null;
  }
};

const chooseAnyNextTile = ({
  currentTile,
  currentDirection,
  boxDoorIsOpen,
}: {
  currentTile: TileCoordinates;
  currentDirection: Direction;
  boxDoorIsOpen: boolean;
}): TileCoordinates | null => {
  // Prioritize the current direction
  const neighbourTileInCurrentDirection = getNextTile(
    currentTile,
    currentDirection
  );

  if (possibleNextTile(neighbourTileInCurrentDirection, boxDoorIsOpen)) {
    return neighbourTileInCurrentDirection;
  }

  // Choose any possible next tile
  for (const direction of Directions) {
    const neighbourTile = getNextTile(currentTile, direction);
    if (possibleNextTile(neighbourTile, boxDoorIsOpen)) {
      return neighbourTile;
    }
  }

  return null;
};

const possibleNextTile = (
  tileCoordinates: TileCoordinates,
  boxDoorIsOpen: boolean
): boolean => {
  return (
    isValidTileCoordinates(tileCoordinates) &&
    isWayFreeForGhostAt(tileCoordinates, boxDoorIsOpen)
  );
};

const isWayFreeForGhostAt = (
  tileCoordinates: TileCoordinates,
  boxDoorIsOpen: boolean
): boolean =>
  isWayFreeAt(tileCoordinates) ||
  (boxDoorIsOpen && isBoxDoorAt(tileCoordinates));
