import { screenFromTile, TILE_SIZE, tileFromScreen } from './Coordinates';

describe('Coordinates', () => {
  describe('screenFromTile()', () => {
    it('returns the screen coordinates from tile coordinates', () => {
      expect(screenFromTile(0, 0)).toEqual([TILE_SIZE / 2, TILE_SIZE / 2]);
      expect(screenFromTile(1, 1)).toEqual([
        TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE + TILE_SIZE / 2,
      ]);
      expect(screenFromTile(2, 3)).toEqual([
        2 * TILE_SIZE + TILE_SIZE / 2,
        3 * TILE_SIZE + TILE_SIZE / 2,
      ]);
    });
  });

  describe('tileFromScreen()', () => {
    it('returns the tile coordinates from screen coordinates', () => {
      expect(tileFromScreen(0, 0)).toEqual([0, 0]);
      expect(tileFromScreen(1, 1)).toEqual([0, 0]);
      expect(
        tileFromScreen(
          2 * TILE_SIZE + TILE_SIZE / 2,
          3 * TILE_SIZE + TILE_SIZE / 2
        )
      ).toEqual([2, 3]);
    });
  });

  describe('forward-backward', () => {
    const [sx, sy] = screenFromTile(1, 3);
    const [tx, ty] = tileFromScreen(sx, sy);
    expect(tx).toBe(1);
    expect(ty).toBe(3);
  });
});
