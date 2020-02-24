import { Game } from './Game';
import { TILE_SIZE } from './Coordinates';

// import { PacManStore } from "./PacManStore";
export {};

describe('PacMan', () => {
  it('has a state', () => {
    // Arrange
    const game = new Game();
    const pacMan = game.pacMan;

    // Assert
    expect(pacMan.state).toBe('eating');
  });

  it('reacts to events', () => {
    // Arrange
    const game = new Game();
    const pacMan = game.pacMan;
    expect(pacMan.state).toBe('eating');

    // Act
    pacMan.send('COLLISION_WITH_GHOST');

    // Assert
    expect(pacMan.state).toBe('dead');
  });

  describe('moveBy()', () => {
    it('advances the screen position', () => {
      // Arrange
      const game = new Game();
      const pacMan = game.pacMan;
      pacMan.screenCoordinates = { x: 20, y: 20 };
      pacMan.moveBy({ x: 2, y: 3 });

      // Assert
      expect(pacMan.screenCoordinates).toEqual({ x: 22, y: 23 });
    });

    it('handles the tunnel when going RIGHT', () => {
      // Arrange
      const game = new Game();
      const pacMan = game.pacMan;
      pacMan.setTileCoordinates({ x: 27, y: 14 });
      pacMan.moveBy({ x: TILE_SIZE, y: 0 });

      // Assert
      expect(pacMan.tileCoordinates).toEqual({ x: 0, y: 14 });
    });

    it('handles the tunnel when going LEFT', () => {
      // Arrange
      const game = new Game();
      const pacMan = game.pacMan;
      pacMan.setTileCoordinates({ x: 0, y: 14 });
      pacMan.moveBy({ x: -TILE_SIZE, y: 0 });

      // Assert
      expect(pacMan.tileCoordinates).toEqual({ x: 27, y: 14 });
    });
  });
});
