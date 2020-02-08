import { GameStore } from './GameStore';

describe('GameStore', () => {
  describe('setPressedKey()', () => {
    it("changes PacMan's direction", () => {
      // Arrange
      const store = new GameStore();
      store.pacMan.setTileCoordinates({ x: 3, y: 1 });

      // Assert
      store.setPressedKey('ArrowLeft');
      expect(store.pacMan.nextDirection).toBe('LEFT');

      store.setPressedKey('ArrowRight');
      expect(store.pacMan.nextDirection).toBe('RIGHT');
    });
  });
});
