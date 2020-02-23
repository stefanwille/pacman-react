import { TileCoordinates } from './Coordinates';
import { findWay } from './findWay';

describe('findWay', () => {
  describe('findWay()', () => {
    describe('with neighbouring tiles', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 1, y: 1 };
        const destination: TileCoordinates = { x: 1, y: 2 };
        const wayPoints: TileCoordinates[] | null = findWay(
          origin,
          destination,
          'STANDSTILL'
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
          destination,
          'STANDSTILL'
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
          destination,
          'STANDSTILL'
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
          destination,
          'STANDSTILL'
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

    describe('with the shortest way being backwards', () => {
      it('avoids going backwards', () => {
        const origin: TileCoordinates = { x: 1, y: 1 };
        const destination: TileCoordinates = { x: 6, y: 1 };
        const wayPoints: TileCoordinates[] | null = findWay(
          origin,
          destination,
          'LEFT'
        );
        expect(wayPoints).toBeTruthy();
        const shortestWay = [
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
          { x: 5, y: 1 },
          { x: 6, y: 1 },
        ];
        expect(wayPoints).not.toEqual(shortestWay);
      });
    });

    describe('with destination in a wall', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 1, y: 1 };
        const destination: TileCoordinates = { x: 0, y: 0 };
        const wayPoints: TileCoordinates[] | null = findWay(
          origin,
          destination,
          'STANDSTILL'
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
          destination,
          'STANDSTILL'
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
