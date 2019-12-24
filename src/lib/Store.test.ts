import { GameStore } from "./Store";
import { onTimeElapsed } from "./onTimeElapsed";

describe("GameStore", () => {
  describe("setPressedKey()", () => {
    it("changes PacMan's direction", () => {
      // Arrange
      const store = new GameStore();

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      store.setPressedKey("ArrowLeft");
      expect(store.pacMan.direction).toBe("LEFT");
      store.setPressedKey("ArrowRight");
      expect(store.pacMan.direction).toBe("RIGHT");
    });
  });

  describe("update()", () => {
    it("advances PacMans position", () => {
      // Arrange
      const store = new GameStore();
      store.pacMan.x = 10;
      store.setPressedKey("ArrowRight");

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.x).toBe(12);

      // Act
      onTimeElapsed({ store, timestamp: 2 });

      // Assert
      expect(store.pacMan.x).toBe(14);
    });
  });
});
