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
        const expectedWay = [origin, { x: 1, y: 2 }, destination];
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
          { x: 1, y: 2 },
          { x: 1, y: 3 },
          { x: 1, y: 4 },
          { x: 1, y: 5 },
          { x: 2, y: 5 },
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
          { x: 10, y: 11 },
          { x: 11, y: 11 },
          { x: 12, y: 11 },
          { x: 12, y: 10 },
          { x: 12, y: 9 },
          { x: 12, y: 8 },
          { x: 11, y: 8 },
          { x: 10, y: 8 },
          { x: 9, y: 8 },
          { x: 9, y: 7 },
          { x: 9, y: 6 },
          { x: 9, y: 5 },
          { x: 8, y: 5 },
          { x: 7, y: 5 },
          { x: 6, y: 5 },
          { x: 6, y: 4 },
          { x: 6, y: 3 },
          { x: 6, y: 2 },
          { x: 6, y: 1 },
          { x: 5, y: 1 },
          { x: 4, y: 1 },
          { x: 3, y: 1 },
        ]);
      });
    });
  });
});
