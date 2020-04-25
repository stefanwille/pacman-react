import { Game } from './Game';
import { SCREEN_TILE_SIZE } from './Coordinates';
import { Store } from './Store';
import { movePacManBy } from './movePacManBy';

describe('movePacManBy()', () => {
  it('advances the screen position', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    const pacMan = game.pacMan;
    pacMan.screenCoordinates = { x: 20, y: 20 };
    movePacManBy(pacMan, { x: 2, y: 3 });

    // Assert
    expect(pacMan.screenCoordinates).toEqual({ x: 22, y: 23 });
  });

  it('handles the tunnel when going RIGHT', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    const pacMan = game.pacMan;
    pacMan.setTileCoordinates({ x: 27, y: 14 });
    movePacManBy(pacMan, { x: SCREEN_TILE_SIZE, y: 0 });

    // Assert
    expect(pacMan.tileCoordinates).toEqual({ x: 0, y: 14 });
  });

  it('handles the tunnel when going LEFT', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    const pacMan = game.pacMan;
    pacMan.setTileCoordinates({ x: 0, y: 14 });
    movePacManBy(pacMan, { x: -SCREEN_TILE_SIZE, y: 0 });

    // Assert
    expect(pacMan.tileCoordinates).toEqual({ x: 27, y: 14 });
  });
});
