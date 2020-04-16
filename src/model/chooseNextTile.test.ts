import { chooseNextTile } from './chooseNextTile';
import { TILE_FOR_RETURNING_TO_BOX } from './chooseNewTargetTile';

describe('chooseNextTile', () => {
  describe('chooseNextTile()', () => {
    it('returns the tile closest to the target', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 1, y: 1 },
          currentDirection: 'DOWN',
          targetTile: { x: 3, y: 1 },
          boxDoorIsOpen: false,
        })
      ).toEqual({ x: 2, y: 1 });
      expect(
        chooseNextTile({
          currentTile: { x: 1, y: 1 },
          currentDirection: 'DOWN',
          targetTile: { x: 3, y: 5 },
          boxDoorIsOpen: false,
        })
      ).toEqual({ x: 1, y: 2 });
    });

    it('avoids wall tiles', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 2, y: 5 },
          currentDirection: 'UP',
          targetTile: { x: 2, y: 1 },
          boxDoorIsOpen: false,
        })
      ).toEqual({ x: 1, y: 5 });
    });

    it('avoids the backward direction', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 2, y: 1 },
          currentDirection: 'LEFT',
          targetTile: { x: 3, y: 1 },
          boxDoorIsOpen: false,
        })
      ).toEqual({ x: 1, y: 1 });
    });

    it('goes through the tunnel to the RIGHT', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 27, y: 14 },
          currentDirection: 'RIGHT',
          targetTile: { x: 2, y: 14 },
          boxDoorIsOpen: false,
        })
      ).toEqual({ x: 0, y: 14 });
    });

    it('goes through the tunnel to the LEFT', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 0, y: 14 },
          currentDirection: 'LEFT',
          targetTile: { x: 25, y: 14 },
          boxDoorIsOpen: false,
        })
      ).toEqual({ x: 27, y: 14 });
    });

    describe('with a target tile outside the maze', () => {
      it('finds some reasonable trip', () => {
        expect(
          chooseNextTile({
            currentTile: { x: 1, y: 1 },
            currentDirection: 'LEFT',
            targetTile: { x: -4, y: 57 },
            boxDoorIsOpen: false,
          })
        ).toEqual({ x: 1, y: 2 });
      });
    });

    describe('outside the box', () => {
      describe('when box door is open', () => {
        it('enters the box', () => {
          expect(
            chooseNextTile({
              currentTile: { x: 13, y: 12 },
              currentDirection: 'DOWN',
              targetTile: TILE_FOR_RETURNING_TO_BOX,
              boxDoorIsOpen: true,
            })
          ).toEqual({ x: 13, y: 13 });
        });
      });
    });

    describe('inside the box', () => {
      describe('when box door is closed', () => {
        it('stays in the box', () => {
          expect(
            chooseNextTile({
              currentTile: { x: 13, y: 14 },
              currentDirection: 'RIGHT',
              targetTile: { x: 13, y: 12 },
              boxDoorIsOpen: false,
            })
          ).toEqual({ x: 14, y: 14 });
        });
      });

      describe('when box door is open', () => {
        it('leaves the box', () => {
          expect(
            chooseNextTile({
              currentTile: { x: 13, y: 14 },
              currentDirection: 'RIGHT',
              targetTile: { x: 13, y: 12 },
              boxDoorIsOpen: true,
            })
          ).toEqual({ x: 13, y: 13 });
        });
      });
    });
  });
});
