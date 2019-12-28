import { PacManStore } from "./PacManStore";
import { setTileCoordinates } from "./MazeObject";

describe("PacManStore", () => {
  describe("setTileCoordinates()", () => {
    it("changes PacMan's position", () => {
      // Arrange
      const store = new PacManStore();

      // Act
      setTileCoordinates({ store, tx: 1, ty: 1 });

      // Assert
      expect(store.x).toBe(30);
      expect(store.y).toBe(30);
    });
  });
});
