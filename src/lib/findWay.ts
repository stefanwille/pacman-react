import * as _ from 'lodash';
import { Directions } from '../components/Types';
import { isValidTileCoordinates, TileCoordinates } from './Coordinates';
import { MAZE_HEIGHT_IN_TILES, MAZE_WIDTH_IN_TILES } from './MazeData';
import { getNextTile, isWayFreeAt } from './Ways';

export const findWay = (
  origin: TileCoordinates,
  destination: TileCoordinates
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
      const next = getNextTile(current, direction);
      if (!isValidTileCoordinates(next)) {
        continue;
      }

      if (!isWayFreeAt(next)) {
        // Is this way free?
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
