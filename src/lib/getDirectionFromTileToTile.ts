import { TileCoordinates } from './Coordinates';
import { GhostDirection } from './Ghost';
import { isEqual } from 'lodash';
import { assert } from '../util/assert';

export const getDirectionFromTileToTile = (
  tileFrom: TileCoordinates,
  tileTo: TileCoordinates
): GhostDirection => {
  assert(tileFrom, 'tileFrom');
  assert(tileTo, 'tileTo');

  if (isEqual(tileFrom, tileTo)) {
    return 'STANDSTILL';
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
