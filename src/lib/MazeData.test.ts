import {
  mazeWidthInTiles,
  mazeHeightInTiles,
  pillsMatrix,
  waysMatrix
} from "./MazeData";

describe("MazeData", () => {
  describe("mazeWidthInTiles()", () => {
    it("returns the Maze width in tiles", () => {
      expect(mazeWidthInTiles).toBe(28);
    });
  });

  describe("mazeHeightInTiles()", () => {
    it("returns the Maze height in tiles", () => {
      expect(mazeHeightInTiles).toBe(31);
    });
  });

  describe("pillsMatrix", () => {
    it("returns the pills in the initial Maze", () => {
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

  describe("waysMatrix", () => {
    it("returns the pills in the initial Maze", () => {
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
