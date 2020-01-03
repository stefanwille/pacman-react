export type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const collide = (rect1: Rectangle, rect2: Rectangle): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

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
