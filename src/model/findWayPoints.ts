import { TileCoordinates } from './Coordinates';
import { Direction } from './Types';
import { isEqual } from 'lodash';
import { chooseNextTile } from './chooseNextTile';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';

export const findWayPoints = (
  origin: TileCoordinates,
  destination: TileCoordinates,
  currentDirection: Direction,
  boxDoorIsOpen: boolean
): TileCoordinates[] | null => {
  const way: TileCoordinates[] = [origin];
  let currentTile = origin;
  let workingDirection = currentDirection;
  while (!isEqual(currentTile, destination)) {
    const nextTile = chooseNextTile({
      currentTile,
      currentDirection: workingDirection,
      targetTile: destination,
      boxDoorIsOpen,
    });
    // Prevent endless iteration
    if (way.some(wayPoint => isEqual(wayPoint, nextTile))) {
      return way;
    }
    way.push(nextTile);
    workingDirection = getDirectionFromTileToTile(
      currentTile,
      nextTile
    ) as Direction;
    currentTile = nextTile;
  }
  return way;
};
