import { changeDirectionToOpposite } from './changeDirectionToOpposite';
import { Game } from './Game';
import { Store } from './Store';

describe('changeDirectionToOpposite', () => {
  describe('changeDirectionToOpposite()', () => {
    it('turns a ghosts direction by 180 degrees', () => {
      // Arrange
      const store = new Store();
      const game = new Game(store);
      const ghost = game.ghosts[0];
      ghost.setTileCoordinates({ x: 6, y: 1 });
      ghost.direction = 'RIGHT';

      // Act
      changeDirectionToOpposite(ghost);

      // Assert
      expect(ghost.direction).toBe('LEFT');
    });
  });
});
