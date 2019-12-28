import { GameStore } from "./Store";
import { onTimeElapsed } from "./onTimeElapsed";
import {
  screenCoordinatesFromTileCoordinates,
  TILE_SIZE,
  tileCoordinatesFromScreenCoordinates
} from "./Coordinates";

describe("Coordinates", () => {
  describe("screenCoordinatesFromTileCoordinates()", () => {
    it("returns the screen coordinates from tile coordinates", () => {
      expect(screenCoordinatesFromTileCoordinates(0, 0)).toEqual([
        TILE_SIZE / 2,
        TILE_SIZE / 2
      ]);
      expect(screenCoordinatesFromTileCoordinates(1, 1)).toEqual([
        TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE + TILE_SIZE / 2
      ]);
      expect(screenCoordinatesFromTileCoordinates(2, 3)).toEqual([
        2 * TILE_SIZE + TILE_SIZE / 2,
        3 * TILE_SIZE + TILE_SIZE / 2
      ]);
    });
  });

  describe("tileCoordinatesFromScreenCoordinates()", () => {
    it("returns the tile coordinates from screen coordinates", () => {
      expect(tileCoordinatesFromScreenCoordinates(0, 0)).toEqual([0, 0]);
      expect(tileCoordinatesFromScreenCoordinates(1, 1)).toEqual([0, 0]);
      expect(
        tileCoordinatesFromScreenCoordinates(
          2 * TILE_SIZE + TILE_SIZE / 2,
          3 * TILE_SIZE + TILE_SIZE / 2
        )
      ).toEqual([2, 3]);
    });
  });
});
