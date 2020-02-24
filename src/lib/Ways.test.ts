import { TILE_SIZE } from './Coordinates';
import {
  isTileCenter,
  isWayFreeAt,
  isWayFreeInDirection,
  moveFromTile,
} from './Ways';

describe('Ways', () => {
  describe('isTileCenter()', () => {
    it('returns true if the given screen coordinates are a tile center', () => {
      expect(
        isTileCenter({ x: TILE_SIZE * 0.5, y: TILE_SIZE * 0.5 })
      ).toBeTruthy();
      expect(
        isTileCenter({ x: TILE_SIZE * 1.5, y: TILE_SIZE * 0.5 })
      ).toBeTruthy();
      expect(
        isTileCenter({ x: TILE_SIZE * 1.5, y: TILE_SIZE * 1.5 })
      ).toBeTruthy();
    });

    it('returns false otherwise', () => {
      expect(
        isTileCenter({ x: 1 + TILE_SIZE * 0.5, y: TILE_SIZE * 0.5 })
      ).toBeFalsy();
      expect(
        isTileCenter({ x: TILE_SIZE * 0.5, y: 1 + TILE_SIZE * 0.5 })
      ).toBeFalsy();
      expect(isTileCenter({ x: 0, y: TILE_SIZE * 0.5 })).toBeFalsy();
    });
  });

  describe('moveFromTile()', () => {
    it('moves from a given tile in a given direction', () => {
      expect(moveFromTile({ x: 1, y: 2 }, 'RIGHT')).toEqual({ x: 2, y: 2 });
      expect(moveFromTile({ x: 10, y: 2 }, 'RIGHT', 2)).toEqual({
        x: 12,
        y: 2,
      });
    });
  });

  describe('isWayFreeAt()', () => {
    it('returns true if the way is free', () => {
      expect(isWayFreeAt({ x: 1, y: 1 })).toBeTruthy();
    });
  });

  describe('isWayFreeInDirection', () => {
    it('returns true if the way is free in the given direction', () => {
      expect(isWayFreeInDirection({ x: 1, y: 1 }, 'RIGHT')).toBeTruthy();
      expect(isWayFreeInDirection({ x: 1, y: 1 }, 'DOWN')).toBeTruthy();
    });

    it('returns false if the way is blocked', () => {
      expect(isWayFreeInDirection({ x: 1, y: 1 }, 'LEFT')).toBeFalsy();
      expect(isWayFreeInDirection({ x: 1, y: 1 }, 'UP')).toBeFalsy();
    });
  });
});
