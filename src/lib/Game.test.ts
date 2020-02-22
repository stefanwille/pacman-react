import { Game } from './Game';

describe('Game', () => {
  describe('setPressedKey()', () => {
    it("changes PacMan's direction", () => {
      // Arrange
      const store = new Game();
      store.pacMan.setTileCoordinates({ x: 3, y: 1 });

      // Assert
      store.setPressedKey('ArrowLeft');
      expect(store.pacMan.nextDirection).toBe('LEFT');

      store.setPressedKey('ArrowRight');
      expect(store.pacMan.nextDirection).toBe('RIGHT');
    });
  });
});
