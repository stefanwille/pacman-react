import { TILE_SIZE } from './Coordinates';
import { Game } from './Game';
import { onTimeElapsed } from './onTimeElapsed';
import { SPEED } from './Types';

const MILLISECONDS_PER_FRAME = 17;

const FRAMES_PER_TILE = TILE_SIZE / SPEED;

const simulateFrames = (numberOfFrames: number, store: Game) => {
  for (let frames = 0; frames < numberOfFrames; frames++) {
    onTimeElapsed({ store, timestamp: 1 + frames * MILLISECONDS_PER_FRAME });
  }
};

const simulateFramesToMoveNTiles = (numberOfTiles: number, store: Game) => {
  const numberOfFrames = numberOfTiles * FRAMES_PER_TILE;
  simulateFrames(numberOfFrames, store);
};

describe('updateGhost', () => {
  describe('updateGhost()', () => {
    it('advances ghost positions', () => {
      // Arrange
      const store = new Game();
      store.pacMan.setTileCoordinates({ x: 1, y: 1 });
      expect(store.pacMan.screenCoordinates.x).toBe(30);
      store.pacMan.direction = 'LEFT';
      store.pacMan.nextDirection = 'LEFT';

      const ghost = store.ghosts[0];
      ghost.send('PHASE_END');
      expect(ghost.state).toBe('chase');
      ghost.setTileCoordinates({ x: 1, y: 3 });
      ghost.ghostPaused = false;
      expect(ghost.screenCoordinates).toEqual({ x: 30, y: 70 });

      // Act
      onTimeElapsed({ store, timestamp: MILLISECONDS_PER_FRAME });

      expect(ghost.screenCoordinates).toEqual({ x: 30, y: 68 });
    });

    describe('in chase mode', () => {
      it('lets ghost 0 chase pacman', () => {
        // Arrange
        const store = new Game();
        store.pacMan.setTileCoordinates({ x: 1, y: 8 });

        store.pacMan.direction = 'LEFT';
        store.pacMan.nextDirection = 'LEFT';

        const ghost = store.ghosts[0];
        ghost.send('PHASE_END');
        expect(ghost.state).toBe('chase');

        ghost.setTileCoordinates({ x: 3, y: 5 });
        ghost.ghostPaused = false;
        expect(ghost.screenCoordinates).toEqual({ x: 70, y: 110 });

        // Act
        onTimeElapsed({ store, timestamp: MILLISECONDS_PER_FRAME });

        expect(ghost.screenCoordinates).toEqual({ x: 68, y: 110 });
        expect(ghost.tileCoordinates).toEqual({ x: 3, y: 5 });
        expect(ghost.targetTile).toEqual({ x: 1, y: 8 });
        expect(ghost.wayPoints).toEqual([
          { x: 3, y: 5 },
          { x: 2, y: 5 },
          { x: 1, y: 5 },
          { x: 1, y: 6 },
          { x: 1, y: 7 },
          { x: 1, y: 8 },
        ]);
        simulateFrames(200, store);
        expect(ghost.state).toBe('chase');
        expect(store.pacMan.state).toBe('dead');
        expect(ghost.tileCoordinates).toEqual({ x: 1, y: 7 });
      });

      it('lets ghost 0 go through the tunnel', () => {
        // Arrange
        const store = new Game();
        store.pacMan.setTileCoordinates({ x: 27, y: 14 });

        store.pacMan.direction = 'RIGHT';
        store.pacMan.nextDirection = 'RIGHT';

        const ghost = store.ghosts[0];
        ghost.send('PHASE_END');
        expect(ghost.state).toBe('chase');

        ghost.setTileCoordinates({ x: 25, y: 14 });
        ghost.direction = 'RIGHT';
        ghost.ghostPaused = false;

        // Act
        onTimeElapsed({ store, timestamp: MILLISECONDS_PER_FRAME });

        expect(ghost.tileCoordinates).toEqual({ x: 25, y: 14 });
        expect(ghost.targetTile).toEqual({ x: 27, y: 14 });
        simulateFramesToMoveNTiles(3, store);
        expect(store.pacMan.tileCoordinates).toEqual({ x: 2, y: 14 });
        expect(ghost.targetTile).toEqual({ x: 2, y: 14 });
        expect(ghost.state).toBe('chase');
        expect(ghost.tileCoordinates).toEqual({ x: 0, y: 14 });
      });
    });

    describe('in scatter mode', () => {
      it('lets ghost 0 go to the lower right corner', () => {
        // Arrange
        const store = new Game();
        store.pacMan.setTileCoordinates({ x: 1, y: 8 });
        store.pacMan.direction = 'LEFT';
        store.pacMan.nextDirection = 'LEFT';

        const ghost = store.ghosts[0];
        expect(ghost.state).toBe('scatter');
        ghost.setTileCoordinates({ x: 24, y: 1 });
        ghost.direction = 'RIGHT';
        ghost.ghostPaused = false;

        // Act
        onTimeElapsed({ store, timestamp: MILLISECONDS_PER_FRAME });

        expect(ghost.targetTile).toEqual({ x: 26, y: 1 });
        expect(ghost.wayPoints).toEqual([
          { x: 24, y: 1 },
          { x: 25, y: 1 },
          { x: 26, y: 1 },
        ]);

        expect(ghost.tileCoordinates).toEqual({ x: 24, y: 1 });
        simulateFramesToMoveNTiles(2, store);

        expect(ghost.tileCoordinates).toEqual({ x: 26, y: 1 });
        expect(ghost.direction).toBe('DOWN');
      });
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
