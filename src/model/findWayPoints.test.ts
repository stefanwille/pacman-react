import { TileCoordinates } from './Coordinates';
import { findWayPoints } from './findWayPoints';
import { TILE_FOR_RETURNING_TO_BOX } from './chooseNewTargetTile';

describe('findWayPoints', () => {
  describe('findWayPoints()', () => {
    describe('with neighbouring tiles', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 1, y: 1 };
        const destination: TileCoordinates = { x: 1, y: 2 };
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'LEFT',
          false
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
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'LEFT',
          false
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
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'UP',
          false
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
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'LEFT',
          false
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
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'LEFT',
          false
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
        const destination: TileCoordinates = { x: 1, y: 0 };
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'UP',
          false
        );
        expect(wayPoints).toEqual([
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
          { x: 5, y: 1 },
          { x: 6, y: 1 },
          { x: 6, y: 2 },
          { x: 6, y: 3 },
          { x: 6, y: 4 },
          { x: 6, y: 5 },
          { x: 5, y: 5 },
          { x: 4, y: 5 },
          { x: 3, y: 5 },
          { x: 2, y: 5 },
          { x: 1, y: 5 },
          { x: 1, y: 4 },
          { x: 1, y: 3 },
          { x: 1, y: 2 },
        ]);
      });
    });

    describe('when entering the box', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 13, y: 11 };
        const destination: TileCoordinates = { x: 13, y: 14 };
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'DOWN',
          true
        );
        expect(wayPoints).toEqual([
          { x: 13, y: 11 },
          { x: 13, y: 12 },
          { x: 13, y: 13 },
          { x: 13, y: 14 },
        ]);
      });

      it('regression', () => {
        const origin: TileCoordinates = { x: 13, y: 12 };
        const destination: TileCoordinates = TILE_FOR_RETURNING_TO_BOX;
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'DOWN',
          true
        );
        expect(wayPoints).toEqual([
          { x: 13, y: 12 },
          { x: 13, y: 13 },
          { x: 13, y: 14 },
          { x: 14, y: 14 },
        ]);
      });
    });

    describe('when the target is outside the maze', () => {
      it('finds some trip', () => {
        const origin: TileCoordinates = { x: 13, y: 11 };
        const destination: TileCoordinates = { x: -4, y: 57 };
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'DOWN',
          true
        );
        expect(wayPoints).toEqual([
          { x: 13, y: 11 },
          { x: 13, y: 12 },
          { x: 13, y: 13 },
          { x: 13, y: 14 },
          { x: 12, y: 14 },
        ]);
      });
    });

    describe('regression test', () => {
      it('finds the way', () => {
        const origin: TileCoordinates = { x: 10, y: 11 };
        const destination: TileCoordinates = { x: 3, y: 1 };
        const wayPoints: TileCoordinates[] | null = findWayPoints(
          origin,
          destination,
          'UP',
          false
        );
        expect(wayPoints).toEqual([
          { x: 10, y: 11 },
          { x: 9, y: 11 },
          { x: 9, y: 12 },
          { x: 9, y: 13 },
          { x: 9, y: 14 },
          { x: 8, y: 14 },
          { x: 7, y: 14 },
          { x: 6, y: 14 },
          { x: 6, y: 13 },
          { x: 6, y: 12 },
          { x: 6, y: 11 },
          { x: 6, y: 10 },
          { x: 6, y: 9 },
          { x: 6, y: 8 },
          { x: 6, y: 7 },
          { x: 6, y: 6 },
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
