import { GameStore } from "./GameStore";
import { onTimeElapsed, isWayFreeAt } from "./onTimeElapsed";
import { screenCoordinateFromTileCoordinate } from "./Coordinates";
import { waysMatrix } from "./MazeData";

describe("onTimeElapsed", () => {
  describe("isWayFreeAt()", () => {
    it("returns true if the way is free", () => {
      console.log(waysMatrix);
      expect(isWayFreeAt(1, 1)).toBeTruthy();
    });
  });
  describe("onTimeElapsed()", () => {
    it("advances PacMans position", () => {
      // Arrange
      const store = new GameStore();
      store.pacMan.x = screenCoordinateFromTileCoordinate(1);
      store.pacMan.y = screenCoordinateFromTileCoordinate(1);
      expect(store.pacMan.x).toBe(30);
      store.pacMan.direction = "RIGHT";

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
      store.pacMan.x = screenCoordinateFromTileCoordinate(1);
      store.pacMan.y = screenCoordinateFromTileCoordinate(1);
      expect(store.pacMan.x).toBe(30);
      store.pacMan.direction = "LEFT";

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.x).toBe(30);
    });
  });
});
