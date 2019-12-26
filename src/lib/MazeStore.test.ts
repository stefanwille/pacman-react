import { getWidthInTiles, getHeightInTiles } from "./MazeStore";

describe("MazeStore", () => {
  describe("getWidthInTiles", () => {
    it("returns the Maze width in tiles", () => {
      expect(getWidthInTiles()).toBe(28);
    });
  });

  describe("getHeightInTiles", () => {
    it("returns the Maze height in tiles", () => {
      expect(getHeightInTiles()).toBe(31);
    });
  });
});
