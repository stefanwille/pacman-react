import { screenFromTile, screenFromTileCoordinate } from './Coordinates';
import { Game } from './Game';
import { Ghost } from './Ghost';
import { BASIC_PILL_ID, EMPTY_TILE_ID } from './MazeData';
import { onTimeElapsed } from './onTimeElapsed';

const MILLISECONDS_PER_FRAME = 17;

const simulateFrames = (numberOfFrames: number, store: Game) => {
  for (let frames = 0; frames < numberOfFrames; frames++) {
    onTimeElapsed({ store, timestamp: 1 + frames * MILLISECONDS_PER_FRAME });
  }
};

describe('onTimeElapsed', () => {
  describe('onTimeElapsed()', () => {
    it('advances PacMans position', () => {
      // Arrange
      const store = new Game();
      store.pacMan.setTileCoordinates({ x: 1, y: 1 });
      expect(store.pacMan.screenCoordinates.x).toBe(30);
      store.pacMan.direction = 'RIGHT';
      store.pacMan.nextDirection = 'RIGHT';

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.screenCoordinates.x).toBe(32);

      // Act
      onTimeElapsed({ store, timestamp: 2 });

      // Assert
      expect(store.pacMan.screenCoordinates.x).toBe(34);
    });

    it('stops pac man once he is dead', () => {
      // Arrange
      const store = new Game();
      store.pacMan.setTileCoordinates({ x: 1, y: 1 });
      expect(store.pacMan.screenCoordinates.x).toBe(30);
      store.pacMan.direction = 'RIGHT';
      store.pacMan.nextDirection = 'RIGHT';

      // Act
      store.pacMan.send('COLLISION_WITH_GHOST');
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.screenCoordinates.x).toBe(30);
    });

    it('stops PacMan when he hits a wall', () => {
      // Arrange
      const store = new Game();
      store.pacMan.setTileCoordinates({ x: 1, y: 1 });
      expect(store.pacMan.screenCoordinates.x).toBe(30);
      store.pacMan.direction = 'LEFT';
      store.pacMan.nextDirection = 'LEFT';

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.screenCoordinates.x).toBe(30);
    });

    it('changes PacMans direction once the way is free', () => {
      // Arrange
      const store = new Game();
      store.pacMan.setScreenCoordinates({ x: 32, y: 30 });
      store.pacMan.direction = 'LEFT';
      store.pacMan.nextDirection = 'DOWN';

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.screenCoordinates.x).toBe(30);
      expect(store.pacMan.screenCoordinates.x).toBe(30);
      expect(store.pacMan.direction).toBe('LEFT');

      // Act
      onTimeElapsed({ store, timestamp: 2 });

      // Assert
      expect(store.pacMan.direction).toBe('DOWN');
      expect(store.pacMan.screenCoordinates.x).toBe(30);
      expect(store.pacMan.screenCoordinates.y).toBe(32);
    });

    it('lets pac man eat basic pills', () => {
      // Arrange
      const BASIC_PILL_TX = 9;
      const BASIC_PILL_TY = 20;

      const store = new Game();
      store.pacMan.setTileCoordinates({
        x: BASIC_PILL_TX,
        y: BASIC_PILL_TY - 1,
      });
      store.pacMan.direction = 'DOWN';
      store.pacMan.nextDirection = 'DOWN';

      expect(store.pills[BASIC_PILL_TY][BASIC_PILL_TX]).toBe(BASIC_PILL_ID);

      // Act
      simulateFrames(10, store);

      // Assert
      expect(store.pacMan.screenCoordinates.x).toBe(
        screenFromTileCoordinate(BASIC_PILL_TX)
      );
      expect(store.pacMan.screenCoordinates.y).toBe(
        screenFromTileCoordinate(BASIC_PILL_TY)
      );

      expect(store.pills[BASIC_PILL_TY][BASIC_PILL_TX]).toBe(EMPTY_TILE_ID);

      expect(store.score).toBe(10);
    });

    it('lets pac man die from meeting a ghost', () => {
      // Arrange
      const GHOST_TX = 1;
      const GHOST_TY = 1;

      const store = new Game();
      const ghost: Ghost = store.ghosts[0];
      ghost.setTileCoordinates({ x: GHOST_TX, y: GHOST_TY });
      ghost.ghostPaused = true;
      store.pacMan.setTileCoordinates({ x: GHOST_TX, y: GHOST_TY + 1 });
      store.pacMan.direction = 'UP';
      store.pacMan.nextDirection = 'UP';

      // Act
      simulateFrames(10, store);

      // Assert
      expect(store.pacMan.state).toBe('dead');
    });

    it('animates pac mans death', () => {
      // Arrange
      const store = new Game();
      store.pacMan.setTileCoordinates({ x: 1, y: 1 });
      store.pacMan.direction = 'UP';
      store.pacMan.nextDirection = 'UP';
      store.pacMan.stateChart.state.value = 'dead';
      store.pacMan.timestamp = 1;
      store.pacMan.diedAtTimestamp = 1;

      expect(store.pacMan.dyingPhase).toBe(0);

      // Act
      simulateFrames(300 / MILLISECONDS_PER_FRAME, store);

      // Assert
      expect(store.pacMan.dyingPhase).toBe(1);

      // Act
      simulateFrames(600 / MILLISECONDS_PER_FRAME, store);

      // Assert
      expect(store.pacMan.dyingPhase).toBe(2);
    });

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
});
