import { chooseNextTile } from './chooseNextTile';

describe('chooseNextTile', () => {
  describe('chooseNextTile()', () => {
    it('returns the tile closest to the target', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 1, y: 1 },
          currentDirection: 'DOWN',
          targetTile: { x: 3, y: 1 },
        })
      ).toEqual({ x: 2, y: 1 });
      expect(
        chooseNextTile({
          currentTile: { x: 1, y: 1 },
          currentDirection: 'DOWN',
          targetTile: { x: 3, y: 5 },
        })
      ).toEqual({ x: 1, y: 2 });
    });

    it('ignores wall tiles', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 2, y: 5 },
          currentDirection: 'UP',
          targetTile: { x: 2, y: 1 },
        })
      ).toEqual({ x: 1, y: 5 });
    });

    it('ignores the backward direction', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 2, y: 1 },
          currentDirection: 'LEFT',
          targetTile: { x: 3, y: 1 },
        })
      ).toEqual({ x: 1, y: 1 });
    });

    it('goes through the tunnel to the RIGHT', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 27, y: 14 },
          currentDirection: 'RIGHT',
          targetTile: { x: 2, y: 14 },
        })
      ).toEqual({ x: 0, y: 14 });
    });

    it('goes through the tunnel to the LEFT', () => {
      expect(
        chooseNextTile({
          currentTile: { x: 0, y: 14 },
          currentDirection: 'LEFT',
          targetTile: { x: 25, y: 14 },
        })
      ).toEqual({ x: 27, y: 14 });
    });
  });
});
