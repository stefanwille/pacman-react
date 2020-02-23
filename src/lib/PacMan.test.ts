import { Game } from './Game';

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
});
