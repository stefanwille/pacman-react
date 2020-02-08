import {
  isWayFreeAt,
  isWayFreeInDirection,
  findWay,
  isTileCenter,
} from './Ways';
import { TileCoordinates, TILE_SIZE } from './Coordinates';

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

  describe('findWay()', () => {
    describe('with neighbouring tiles', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 1, y: 1 };
        const destination: TileCoordinates = { x: 1, y: 2 };
        const wayPoints: TileCoordinates[] | null = findWay(
          origin,
          destination
        );
        expect(wayPoints).toBeTruthy();
        const expectedWay = [origin, destination];
        expect(wayPoints).toEqual(expectedWay);
      });
    });

    describe('with 1 tile down', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 1, y: 1 };
        const destination: TileCoordinates = { x: 1, y: 3 };
        const wayPoints: TileCoordinates[] | null = findWay(
          origin,
          destination
        );
        expect(wayPoints).toBeTruthy();
        const expectedWay = [origin, [1, 2], destination];
        expect(wayPoints).toEqual(expectedWay);
      });
    });

    describe('with 1 tile right', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 1, y: 1 };
        const destination: TileCoordinates = { x: 2, y: 1 };
        const wayPoints: TileCoordinates[] | null = findWay(
          origin,
          destination
        );
        expect(wayPoints).toBeTruthy();
        const expectedWay = [origin, destination];
        expect(wayPoints).toEqual(expectedWay);
      });
    });

    describe('with a corner to take', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 1, y: 1 };
        const destination: TileCoordinates = { x: 3, y: 5 };
        const wayPoints: TileCoordinates[] | null = findWay(
          origin,
          destination
        );
        expect(wayPoints).toBeTruthy();
        const expectedWay = [
          origin,
          [1, 2],
          [1, 3],
          [1, 4],
          [1, 5],
          [2, 5],
          destination,
        ];
        expect(wayPoints).toEqual(expectedWay);
      });
    });

    describe('with destination in a wall', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 1, y: 1 };
        const destination: TileCoordinates = { x: 0, y: 0 };
        const wayPoints: TileCoordinates[] | null = findWay(
          origin,
          destination
        );
        expect(wayPoints).toBeNull();
      });
    });

    describe('regression test', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 10, y: 11 };
        const destination: TileCoordinates = { x: 3, y: 1 };
        const wayPoints: TileCoordinates[] | null = findWay(
          origin,
          destination
        );
        expect(wayPoints).toEqual([
          [10, 11],
          [11, 11],
          [12, 11],
          [12, 10],
          [12, 9],
          [12, 8],
          [11, 8],
          [10, 8],
          [9, 8],
          [9, 7],
          [9, 6],
          [9, 5],
          [8, 5],
          [7, 5],
          [6, 5],
          [6, 4],
          [6, 3],
          [6, 2],
          [6, 1],
          [5, 1],
          [4, 1],
          [3, 1],
        ]);
      });
    });
  });
});
