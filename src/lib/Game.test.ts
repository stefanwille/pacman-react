import { Game, DEFAULT_SPEED } from './Game';
import { SCREEN_TILE_SIZE } from './Coordinates';

describe('Game', () => {
  describe('DEFAULT_SPEED', () => {
    it('DEFAULT_SPEED must be a divisor of SCREEN_TILE_SIZE. Otherwise our logic breaks.', () => {
      expect(SCREEN_TILE_SIZE % DEFAULT_SPEED).toBe(0);
    });
  });
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
