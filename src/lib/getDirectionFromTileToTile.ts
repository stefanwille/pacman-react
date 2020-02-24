import { TileCoordinates } from './Coordinates';
import { isEqual } from 'lodash';
import { assert } from '../util/assert';
import { Direction } from './Types';

export const getDirectionFromTileToTile = (
  tileFrom: TileCoordinates,
  tileTo: TileCoordinates
): Direction => {
  assert(tileFrom, 'tileFrom');
  assert(tileTo, 'tileTo');

  if (isEqual(tileFrom, tileTo)) {
    throw new Error('Same tile');
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
