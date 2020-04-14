import { TileCoordinates, TileCoordinate } from './Coordinates';
import { isEqual } from 'lodash';
import { assert } from '../util/assert';
import { Direction } from './Types';
import { MAZE_WIDTH_IN_TILES } from './MazeData';

const TUNNEL_X_LEFT: TileCoordinate = 0;
const TUNNEL_X_RIGHT: TileCoordinate = MAZE_WIDTH_IN_TILES - 1;

export const getDirectionFromTileToTile = (
  tileFrom: TileCoordinates,
  tileTo: TileCoordinates
): Direction => {
  assert(tileFrom, 'tileFrom');
  assert(tileTo, 'tileTo');

  if (isEqual(tileFrom, tileTo)) {
    throw new Error('Same tile');
  }

  // Go through the tunnel?
  if (tileFrom.x === TUNNEL_X_RIGHT && tileTo.x === TUNNEL_X_LEFT) {
    return 'RIGHT';
  }
  // Go through the tunnel?
  if (tileFrom.x === TUNNEL_X_LEFT && tileTo.x === TUNNEL_X_RIGHT) {
    return 'LEFT';
  }
  if (tileFrom.x < tileTo.x) {
    return 'RIGHT';
  }
  if (tileFrom.x > tileTo.x) {
    return 'LEFT';
  }
  if (tileFrom.y < tileTo.y) {
    return 'DOWN';
  }
  if (tileFrom.y > tileTo.y) {
    return 'UP';
  }
  throw new Error('Same tiles');
};
