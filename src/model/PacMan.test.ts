import { Game } from './Game';
import { Store } from './Store';

// import { PacManStore } from "./PacManStore";
export {};

describe('PacMan', () => {
  it('has a state', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    const pacMan = game.pacMan;

    // Assert
    expect(pacMan.state).toBe('eating');
  });

  it('reacts to events', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    const pacMan = game.pacMan;
    expect(pacMan.state).toBe('eating');

    // Act
    pacMan.send('COLLISION_WITH_GHOST');

    // Assert
    expect(pacMan.state).toBe('dead');
  });
});
