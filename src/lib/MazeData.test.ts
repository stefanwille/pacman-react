import { mazeWidthInTiles, mazeHeightInTiles, pillsMatrix } from "./MazeData";

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
      expect(pillsMatrix[0]).toEqual([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]);
      expect(pillsMatrix[1]).toEqual([
        0,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        0,
        0,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        3533,
        0
      ]);
    });
  });
});
