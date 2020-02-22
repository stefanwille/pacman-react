import { Game } from './Game';
import { onTimeElapsed } from './onTimeElapsed';

const MILLISECONDS_PER_FRAME = 17;

const simulateFrames = (numberOfFrames: number, store: Game) => {
  for (let frames = 0; frames < numberOfFrames; frames++) {
    onTimeElapsed({ store, timestamp: 1 + frames * MILLISECONDS_PER_FRAME });
  }
};

describe('updateGhost', () => {
  it('advances ghost positions', () => {
    // Arrange
    const store = new Game();
    store.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(store.pacMan.screenCoordinates.x).toBe(30);
    store.pacMan.direction = 'LEFT';
    store.pacMan.nextDirection = 'LEFT';

    const ghost = store.ghosts[0];
    ghost.setTileCoordinates({ x: 1, y: 3 });
    ghost.ghostPaused = false;
    expect(ghost.screenCoordinates).toEqual({ x: 30, y: 70 });

    // Act
    onTimeElapsed({ store, timestamp: MILLISECONDS_PER_FRAME });

    expect(ghost.screenCoordinates).toEqual({ x: 30, y: 68 });
  });

  it('lets the ghost find a way to pacman', () => {
    // Arrange
    const store = new Game();
    store.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(store.pacMan.screenCoordinates.x).toBe(30);
    store.pacMan.direction = 'LEFT';
    store.pacMan.nextDirection = 'LEFT';

    const ghost = store.ghosts[0];
    ghost.setTileCoordinates({ x: 3, y: 1 });
    ghost.ghostPaused = false;
    expect(ghost.screenCoordinates).toEqual({ x: 70, y: 30 });

    // Act
    onTimeElapsed({ store, timestamp: MILLISECONDS_PER_FRAME });

    expect(ghost.screenCoordinates).toEqual({ x: 68, y: 30 });
    expect(ghost.wayPoints).toEqual([
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  it('lets the ghost pause when pac man is dead', () => {
    // Arrange
    const store = new Game();
    store.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(store.pacMan.screenCoordinates.x).toBe(30);
    store.pacMan.direction = 'LEFT';
    store.pacMan.nextDirection = 'LEFT';

    const ghost = store.ghosts[0];
    ghost.setTileCoordinates({ x: 3, y: 1 });
    ghost.ghostPaused = false;
    expect(ghost.screenCoordinates).toEqual({ x: 70, y: 30 });

    // Act
    simulateFrames(20, store);

    expect(store.pacMan.state === 'dead');
    expect(ghost.ghostPaused).toBeTruthy();
  });
});
