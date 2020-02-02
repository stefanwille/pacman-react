import { isWayFreeAt, isWayFreeInDirection, findWay } from './Ways';
import { Coordinates } from './Coordinates';

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

  describe('findWay()', () => {
    const origin: Coordinates = [1, 1];
    const destination: Coordinates = [6, 14];
    const wayPoints: Coordinates[] = findWay(origin, destination);
    const expectedWay = [origin, [1, 2], destination];
    expect(wayPoints).toEqual(expectedWay);
  });
});
