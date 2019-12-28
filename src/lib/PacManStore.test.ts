import { PacManStore } from "./PacManStore";
import { screenCoordinatesFromTileCoordinates } from "./Coordinates";

interface MazeObject {
  x: number;
  y: number;
}

const setTileCoordinates = ({
  store,
  tx,
  ty
}: {
  store: MazeObject;
  tx: number;
  ty: number;
}) => {
  const [sx, sy] = screenCoordinatesFromTileCoordinates(tx, ty);
  store.x = sx;
  store.y = sy;
};

describe("PacManStore", () => {
  describe("setTileCoordinates()", () => {
    it("changes PacMan's position", () => {
      // Arrange
      const store = new PacManStore();

      // Act
      setTileCoordinates({ store, tx: 1, ty: 1 });

      // Assert
      expect(store.x).toBe(20 + 10);
      expect(store.y).toBe(20 + 10);
    });
  });
});
