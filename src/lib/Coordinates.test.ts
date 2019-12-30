import {
  screenFromTileCoordinates,
  TILE_SIZE,
  tileFromScreenCoordinates,
} from "./Coordinates";

describe("Coordinates", () => {
  describe("screenFromTileCoordinates()", () => {
    it("returns the screen coordinates from tile coordinates", () => {
      expect(screenFromTileCoordinates(0, 0)).toEqual([
        TILE_SIZE / 2,
        TILE_SIZE / 2,
      ]);
      expect(screenFromTileCoordinates(1, 1)).toEqual([
        TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE + TILE_SIZE / 2,
      ]);
      expect(screenFromTileCoordinates(2, 3)).toEqual([
        2 * TILE_SIZE + TILE_SIZE / 2,
        3 * TILE_SIZE + TILE_SIZE / 2,
      ]);
    });
  });

  describe("tileFromScreenCoordinates()", () => {
    it("returns the tile coordinates from screen coordinates", () => {
      expect(tileFromScreenCoordinates(0, 0)).toEqual([0, 0]);
      expect(tileFromScreenCoordinates(1, 1)).toEqual([0, 0]);
      expect(
        tileFromScreenCoordinates(
          2 * TILE_SIZE + TILE_SIZE / 2,
          3 * TILE_SIZE + TILE_SIZE / 2
        )
      ).toEqual([2, 3]);
    });
  });
});
