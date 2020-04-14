import { collide } from './collisionDetection';

describe('collisionDetection', () => {
  describe('collide()', () => {
    it('returns true if two rectangles overlap', () => {
      expect(
        collide(
          { x: 100, y: 100, width: 100, height: 100 },
          { x: 150, y: 100, width: 100, height: 100 }
        )
      ).toBeTruthy();

      expect(
        collide(
          { x: 150, y: 100, width: 100, height: 100 },
          { x: 100, y: 100, width: 100, height: 100 }
        )
      ).toBeTruthy();
    });

    it('returns true if the two rectangles are the same', () => {
      expect(
        collide(
          { x: 100, y: 100, width: 100, height: 100 },
          { x: 100, y: 100, width: 100, height: 100 }
        )
      ).toBeTruthy();
    });

    it('returns false otherwise', () => {
      expect(
        collide(
          { x: 100, y: 100, width: 100, height: 100 },
          { x: 250, y: 100, width: 100, height: 100 }
        )
      ).toBeFalsy();
    });
  });
});
