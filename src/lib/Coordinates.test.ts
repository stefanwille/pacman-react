import {
  screenFromTile,
  SCREEN_TILE_SIZE,
  tileFromScreen,
  getTileVector,
  rotateTileVectorBy180Degress,
  moveTileByVector,
  multiplyVector,
} from './Coordinates';

describe('Coordinates', () => {
  describe('screenFromTile()', () => {
    it('returns the screen coordinates from tile coordinates', () => {
      expect(screenFromTile({ x: 0, y: 0 })).toEqual({
        x: 0 * SCREEN_TILE_SIZE + SCREEN_TILE_SIZE / 2,
        y: 0 * SCREEN_TILE_SIZE + SCREEN_TILE_SIZE / 2,
      });
      expect(screenFromTile({ x: 1, y: 1 })).toEqual({
        x: 1 * SCREEN_TILE_SIZE + SCREEN_TILE_SIZE / 2,
        y: 1 * SCREEN_TILE_SIZE + SCREEN_TILE_SIZE / 2,
      });
      expect(screenFromTile({ x: 2, y: 3 })).toEqual({
        x: 2 * SCREEN_TILE_SIZE + SCREEN_TILE_SIZE / 2,
        y: 3 * SCREEN_TILE_SIZE + SCREEN_TILE_SIZE / 2,
      });
    });
  });

  describe('tileFromScreen()', () => {
    it('returns the tile coordinates from screen coordinates', () => {
      expect(tileFromScreen({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
      expect(tileFromScreen({ x: 1, y: 1 })).toEqual({ x: 0, y: 0 });
      expect(
        tileFromScreen({
          x: 2 * SCREEN_TILE_SIZE + SCREEN_TILE_SIZE / 2,
          y: 3 * SCREEN_TILE_SIZE + SCREEN_TILE_SIZE / 2,
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

  describe('rotateTileVectorBy180Degress()', () => {
    it('works', () => {
      expect(rotateTileVectorBy180Degress({ x: 2, y: -11 })).toEqual({
        x: -2,
        y: 11,
      });
    });
  });

  describe('moveTileByVector()', () => {
    it('works', () => {
      expect(moveTileByVector({ x: 10, y: 20 }, { x: 2, y: -11 })).toEqual({
        x: 12,
        y: 9,
      });
    });
  });

  describe('multiplyVector()', () => {
    it('works', () => {
      expect(multiplyVector(3, { x: 2, y: -11 })).toEqual({
        x: 6,
        y: -33,
      });
    });
  });
});
