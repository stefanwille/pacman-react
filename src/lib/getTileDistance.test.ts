import { getTileDistance } from './getTileDistance';

describe('getTileDistance()', () => {
  it('returns the distance between to tiles', () => {
    expect(getTileDistance({ x: 1, y: 1 }, { x: 1, y: 1 })).toBe(0);
    expect(getTileDistance({ x: 1, y: 1 }, { x: 1, y: 2 })).toBe(1);
    expect(getTileDistance({ x: 1, y: 1 }, { x: 3, y: 3 })).toBe(
      2.8284271247461903
    );
    expect(getTileDistance({ x: 1, y: 1 }, { x: 4, y: 5 })).toBe(5); // 3, 4 => 9 + 16 = 25 => 5
  });
});
