import {
  screenFromTile,
  TILE_SIZE,
  tileFromScreen,
  getTileVector,
} from './Coordinates';

describe('Coordinates', () => {
  describe('screenFromTile()', () => {
    it('returns the screen coordinates from tile coordinates', () => {
      expect(screenFromTile({ x: 0, y: 0 })).toEqual({
        x: TILE_SIZE / 2,
        y: TILE_SIZE / 2,
      });
      expect(screenFromTile({ x: 1, y: 1 })).toEqual({
        x: TILE_SIZE + TILE_SIZE / 2,
        y: TILE_SIZE + TILE_SIZE / 2,
      });
      expect(screenFromTile({ x: 2, y: 3 })).toEqual({
        x: 2 * TILE_SIZE + TILE_SIZE / 2,
        y: 3 * TILE_SIZE + TILE_SIZE / 2,
      });
    });
  });

  describe('tileFromScreen()', () => {
    it('returns the tile coordinates from screen coordinates', () => {
      expect(tileFromScreen({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
      expect(tileFromScreen({ x: 1, y: 1 })).toEqual({ x: 0, y: 0 });
      expect(
        tileFromScreen({
          x: 2 * TILE_SIZE + TILE_SIZE / 2,
          y: 3 * TILE_SIZE + TILE_SIZE / 2,
        })
      ).toEqual({ x: 2, y: 3 });
    });
  });

  describe('forward-backward', () => {
    const screen = screenFromTile({ x: 1, y: 3 });
    const tile = tileFromScreen(screen);
    expect(tile).toEqual({ x: 1, y: 3 });
  });

  describe('getTileVector()', () => {
    it('returns the difference between 2 tiles', () => {
      expect(getTileVector({ x: 6, y: 7 }, { x: 6, y: 1 })).toEqual({
        x: 0,
        y: -6,
      });
    });
  });
});
