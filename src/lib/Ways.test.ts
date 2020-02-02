import { isWayFreeAt, isWayFreeInDirection } from './Ways';

describe('Ways', () => {
  describe('isWayFreeAt()', () => {
    it('returns true if the way is free', () => {
      expect(isWayFreeAt(1, 1)).toBeTruthy();
    });
  });

  describe('isWayFreeInDirection', () => {
    it('returns true if the way is free in the given direction', () => {
      expect(isWayFreeInDirection(1, 1, 'RIGHT')).toBeTruthy();
      expect(isWayFreeInDirection(1, 1, 'DOWN')).toBeTruthy();
    });

    it('returns false if the way is blocked', () => {
      expect(isWayFreeInDirection(1, 1, 'LEFT')).toBeFalsy();
      expect(isWayFreeInDirection(1, 1, 'UP')).toBeFalsy();
    });
  });
});
