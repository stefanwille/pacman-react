import {
  MAZE_WIDTH_IN_TILES,
  MAZE_HEIGHT_IN_TILES,
  getPillsMatrix,
  waysMatrix,
} from './MazeData';

describe('MazeData', () => {
  const pillsMatrix = getPillsMatrix();

  describe('mazeWidthInTiles()', () => {
    it('returns the Maze width in tiles', () => {
      expect(MAZE_WIDTH_IN_TILES).toBe(28);
    });
  });

  describe('mazeHeightInTiles()', () => {
    it('returns the Maze height in tiles', () => {
      expect(MAZE_HEIGHT_IN_TILES).toBe(31);
    });
  });

  describe('pillsMatrix', () => {
    it('returns the pills in the initial Maze', () => {
      expect(pillsMatrix[0]).toEqual(
        // prettier-ignore
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      );
      expect(pillsMatrix[1]).toEqual(
        // prettier-ignore
        [ 0, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 0, 0, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 3533, 0 ]
      );
    });
  });

  describe('waysMatrix', () => {
    it('returns the ways in the Maze', () => {
      expect(waysMatrix[0]).toEqual(
        // prettier-ignore
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      );
      expect(waysMatrix[1]).toEqual(
        // prettier-ignore
        [ 0, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 0, 0, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 5240, 0 ]
      );
    });
  });
});
