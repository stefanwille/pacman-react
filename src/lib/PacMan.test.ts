import { PacMan } from './PacMan';

// import { PacManStore } from "./PacManStore";
export {};

describe('PacManStore', () => {
  it('has a state', () => {
    // Arrange
    const pacMan = new PacMan();

    // Assert
    expect(pacMan.state).toBe('eating');
  });

  it('reactions to events', () => {
    // Arrange
    const pacMan = new PacMan();
    expect(pacMan.state).toBe('eating');

    // Act
    pacMan.send('COLLISION_WITH_GHOST');

    // Assert
    expect(pacMan.state).toBe('dead');
  });
});
