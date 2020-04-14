import { SCREEN_TILE_SIZE } from './Coordinates';
import {
  isTileCenter,
  isWayFreeAt,
  isWayFreeInDirection,
  moveFromTile,
  getNextTile,
} from './Ways';

describe('Ways', () => {
  describe('getNextTile()', () => {
    it('returns the tile n steps in the given direction', () => {
      expect(getNextTile({ x: 1, y: 1 }, 'RIGHT')).toEqual({ x: 2, y: 1 });
      expect(getNextTile({ x: 1, y: 1 }, 'DOWN', 3)).toEqual({ x: 1, y: 4 });
    });

    it('handles the tunnel', () => {
      expect(getNextTile({ x: 0, y: 14 }, 'LEFT')).toEqual({ x: 27, y: 14 });
      expect(getNextTile({ x: 0, y: 14 }, 'LEFT', 2)).toEqual({ x: 26, y: 14 });
      expect(getNextTile({ x: 26, y: 14 }, 'RIGHT', 2)).toEqual({
        x: 0,
        y: 14,
      });
    });
  });

  describe('isTileCenter()', () => {
    it('returns true if the given screen coordinates are a tile center', () => {
      expect(
        isTileCenter({ x: SCREEN_TILE_SIZE * 0, y: SCREEN_TILE_SIZE * 0 })
      ).toBeTruthy();
      expect(
        isTileCenter({ x: SCREEN_TILE_SIZE * 1, y: SCREEN_TILE_SIZE * 0 })
      ).toBeTruthy();
      expect(
        isTileCenter({ x: SCREEN_TILE_SIZE * 1, y: SCREEN_TILE_SIZE * 1 })
      ).toBeTruthy();
    });

    it('returns false otherwise', () => {
      expect(
        isTileCenter({
          x: SCREEN_TILE_SIZE * 1,
          y: SCREEN_TILE_SIZE * 0.5,
        })
      ).toBeFalsy();
      expect(
        isTileCenter({
          x: SCREEN_TILE_SIZE * 1,
          y: SCREEN_TILE_SIZE * 2 + 1,
        })
      ).toBeFalsy();
      expect(isTileCenter({ x: 0, y: SCREEN_TILE_SIZE * 0.5 })).toBeFalsy();
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
