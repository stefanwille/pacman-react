import { minBy } from 'lodash';
import { isValidTileCoordinates, TileCoordinates } from './Coordinates';
import { Direction, Directions } from './Types';
import { getNextTile, isOppositeDirection, isWayFreeAt } from './Ways';
import { getTileDistance } from './getTileDistance';

interface CandidateTile {
  tile: TileCoordinates;
  distanceToTarget: number;
}

export const chooseNextTile = ({
  currentTile,
  currentDirection,
  targetTile,
}: {
  currentTile: TileCoordinates;
  currentDirection: Direction;
  targetTile: TileCoordinates;
}): TileCoordinates => {
  const candidates = [] as CandidateTile[];
  for (const direction of Directions) {
    // Prevent the ghost from going backwards
    if (isOppositeDirection(direction, currentDirection)) {
      continue;
    }
    const neighbourTile = getNextTile(currentTile, direction);

    if (!isValidTileCoordinates(neighbourTile)) {
      continue;
    }

    // Is this way free?
    if (!isWayFreeAt(neighbourTile)) {
      continue;
    }

    const distanceToTarget = getTileDistance(neighbourTile, targetTile);
    candidates.push({ tile: neighbourTile, distanceToTarget });
  }

  const bestCandidate = minBy(candidates, 'distanceToTarget');
  if (!bestCandidate) {
    throw new Error(`Found no candidate at ${JSON.stringify(currentTile)}`);
  }

  return bestCandidate.tile;
};
