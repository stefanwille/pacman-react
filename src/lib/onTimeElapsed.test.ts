import { GameStore } from "./GameStore";
import {
  onTimeElapsed,
  isWayFreeAt,
  isTileCenter,
  isWayFreeInDirection,
} from "./onTimeElapsed";
import {
  screenFromTileCoordinate,
  TILE_SIZE,
  screenFromTile,
} from "./Coordinates";

describe("onTimeElapsed", () => {
  describe("isWayFreeAt()", () => {
    it("returns true if the way is free", () => {
      expect(isWayFreeAt(1, 1)).toBeTruthy();
    });
  });

  describe("isTileCenter()", () => {
    it("returns true if the given screen coordinates are a tile center", () => {
      expect(isTileCenter(TILE_SIZE * 0.5, TILE_SIZE * 0.5)).toBeTruthy();
      expect(isTileCenter(TILE_SIZE * 1.5, TILE_SIZE * 0.5)).toBeTruthy();
      expect(isTileCenter(TILE_SIZE * 1.5, TILE_SIZE * 1.5)).toBeTruthy();
    });

    it("returns false otherwise", () => {
      expect(isTileCenter(1 + TILE_SIZE * 0.5, TILE_SIZE * 0.5)).toBeFalsy();
      expect(isTileCenter(TILE_SIZE * 0.5, 1 + TILE_SIZE * 0.5)).toBeFalsy();
      expect(isTileCenter(0, TILE_SIZE * 0.5)).toBeFalsy();
    });
  });

  describe("isWayFreeInDirection", () => {
    it("returns true if the way is free in the given direction", () => {
      expect(isWayFreeInDirection(1, 1, "RIGHT")).toBeTruthy();
      expect(isWayFreeInDirection(1, 1, "DOWN")).toBeTruthy();
    });

    it("returns false if the way is blocked", () => {
      expect(isWayFreeInDirection(1, 1, "LEFT")).toBeFalsy();
      expect(isWayFreeInDirection(1, 1, "UP")).toBeFalsy();
    });
  });

  describe("onTimeElapsed()", () => {
    it("advances PacMans position", () => {
      // Arrange
      const store = new GameStore();
      store.pacMan.x = screenFromTileCoordinate(1);
      store.pacMan.y = screenFromTileCoordinate(1);
      expect(store.pacMan.x).toBe(30);
      store.pacMan.direction = "RIGHT";
      store.pacMan.nextDirection = "RIGHT";

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.x).toBe(32);

      // Act
      onTimeElapsed({ store, timestamp: 2 });

      // Assert
      expect(store.pacMan.x).toBe(34);
    });

    it("stops PacMan when he hits a wall", () => {
      // Arrange
      const store = new GameStore();
      [store.pacMan.x, store.pacMan.y] = screenFromTile(1, 1);
      expect(store.pacMan.x).toBe(30);
      store.pacMan.direction = "LEFT";
      store.pacMan.nextDirection = "LEFT";

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.x).toBe(30);
    });

    it("changes PacMans direction once it the way is free", () => {
      // Arrange
      const store = new GameStore();
      [store.pacMan.x, store.pacMan.y] = [32, 30];
      store.pacMan.direction = "LEFT";
      store.pacMan.nextDirection = "DOWN";

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.x).toBe(30);
      expect(store.pacMan.x).toBe(30);
      expect(store.pacMan.direction).toBe("LEFT");

      // Act
      onTimeElapsed({ store, timestamp: 2 });

      // Assert
      expect(store.pacMan.direction).toBe("DOWN");
      expect(store.pacMan.x).toBe(30);
      expect(store.pacMan.y).toBe(32);
    });
  });
});
