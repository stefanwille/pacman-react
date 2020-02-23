import * as _ from 'lodash';
import { Direction, Directions } from './Types';
import { isValidTileCoordinates, TileCoordinates } from './Coordinates';
import { GhostDirection } from './Ghost';
import { MAZE_HEIGHT_IN_TILES, MAZE_WIDTH_IN_TILES } from './MazeData';
import { getNextTile, isWayFreeAt, isOppositeDirection } from './Ways';

export const isBackwardDirection = (
  direction: Direction,
  currentDirection: GhostDirection
) => {
  if (currentDirection === 'STANDSTILL') {
    return false;
  }

  return isOppositeDirection(direction, currentDirection);
};

export const findWay = (
  origin: TileCoordinates,
  destination: TileCoordinates,
  currentDirection: GhostDirection
): TileCoordinates[] | null => {
  if (!isWayFreeAt(origin)) {
    return null;
  }
  if (!isWayFreeAt(destination)) {
    return null;
  }

  const frontier: TileCoordinates[] = [];
  const comesFrom: TileCoordinates[][] = [];
  for (let ty = 0; ty < MAZE_HEIGHT_IN_TILES; ty++) {
    for (let tx = 0; tx < MAZE_WIDTH_IN_TILES; tx++) {
      const row = Array(MAZE_WIDTH_IN_TILES).fill(null);
      comesFrom.push(row);
    }
  }

  frontier.push(origin);
  comesFrom[origin.y][origin.x] = origin;
  // Is this the very first step we are looking at?
  let firstStep = true;
  while (frontier.length > 0) {
    const current: TileCoordinates | undefined = frontier.shift();
    if (!current) {
      // No way to the destination found
      return null;
    }

    if (_.isEqual(current, destination)) {
      // We have arrived at the destination
      break;
    }

    for (const direction of Directions) {
      // Prevent the ghost from going backwards
      if (firstStep && isBackwardDirection(direction, currentDirection)) {
        continue;
      }
      const next = getNextTile(current, direction);
      if (!isValidTileCoordinates(next)) {
        continue;
      }

      // Is this way free?
      if (!isWayFreeAt(next)) {
        continue;
      }
      // Has another way arrived at these coordinate before?
      if (comesFrom[next.y][next.x]) {
        continue;
      }

      // Extend the frontier with this candidate
      frontier.push(next);
      // and track where it came from
      comesFrom[next.y][next.x] = current;
    }

    firstStep = false;
  }

  // Walk back from destination to origin
  const way: TileCoordinates[] = [];
  let current: TileCoordinates = destination;
  while (!_.isEqual(current, origin)) {
    way.unshift(current);
    current = comesFrom[current.y][current.x];
    if (!current) {
      throw new Error('current not set');
    }
  }
  way.unshift(origin);

  return way;
};
