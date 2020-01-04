import { GameStore } from './GameStore';
import {
  onTimeElapsed,
  isWayFreeAt,
  isTileCenter,
  isWayFreeInDirection,
} from './onTimeElapsed';
import {
  screenFromTileCoordinate,
  TILE_SIZE,
  screenFromTile,
} from './Coordinates';
import { BASIC_PILL_ID, EMPTY_TILE_ID } from './MazeData';
import { Ghost } from './Ghost';

const simulateFrames = (numberOfFrames: number, store: GameStore) => {
  for (let frames = 0; frames < numberOfFrames; frames++) {
    onTimeElapsed({ store, timestamp: 1 + frames });
  }
};

describe('onTimeElapsed', () => {
  describe('isWayFreeAt()', () => {
    it('returns true if the way is free', () => {
      expect(isWayFreeAt(1, 1)).toBeTruthy();
    });
  });

  describe('isTileCenter()', () => {
    it('returns true if the given screen coordinates are a tile center', () => {
      expect(isTileCenter(TILE_SIZE * 0.5, TILE_SIZE * 0.5)).toBeTruthy();
      expect(isTileCenter(TILE_SIZE * 1.5, TILE_SIZE * 0.5)).toBeTruthy();
      expect(isTileCenter(TILE_SIZE * 1.5, TILE_SIZE * 1.5)).toBeTruthy();
    });

    it('returns false otherwise', () => {
      expect(isTileCenter(1 + TILE_SIZE * 0.5, TILE_SIZE * 0.5)).toBeFalsy();
      expect(isTileCenter(TILE_SIZE * 0.5, 1 + TILE_SIZE * 0.5)).toBeFalsy();
      expect(isTileCenter(0, TILE_SIZE * 0.5)).toBeFalsy();
    });
  });

  describe('isWayFreeInDirection', () => {
    it('returns true if the way is free in the given direction', () => {
      expect(isWayFreeInDirection(1, 1, 'RIGHT')).toBeTruthy();
      expect(isWayFreeInDirection(1, 1, 'DOWN')).toBeTruthy();
    });

    it('returns false if the way is blocked', () => {
      expect(isWayFreeInDirection(1, 1, 'LEFT')).toBeFalsy();
      expect(isWayFreeInDirection(1, 1, 'UP')).toBeFalsy();
    });
  });

  describe('onTimeElapsed()', () => {
    it('advances PacMans position', () => {
      // Arrange
      const store = new GameStore();
      store.pacMan.x = screenFromTileCoordinate(1);
      store.pacMan.y = screenFromTileCoordinate(1);
      expect(store.pacMan.x).toBe(30);
      store.pacMan.direction = 'RIGHT';
      store.pacMan.nextDirection = 'RIGHT';

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.x).toBe(32);

      // Act
      onTimeElapsed({ store, timestamp: 2 });

      // Assert
      expect(store.pacMan.x).toBe(34);
    });

    it('stops pac man once he is dead', () => {
      // Arrange
      const store = new GameStore();
      store.pacMan.x = screenFromTileCoordinate(1);
      store.pacMan.y = screenFromTileCoordinate(1);
      expect(store.pacMan.x).toBe(30);
      store.pacMan.direction = 'RIGHT';
      store.pacMan.nextDirection = 'RIGHT';

      // Act
      store.pacMan.send('COLLISION_WITH_GHOST');
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.x).toBe(30);
    });

    it('stops PacMan when he hits a wall', () => {
      // Arrange
      const store = new GameStore();
      [store.pacMan.x, store.pacMan.y] = screenFromTile(1, 1);
      expect(store.pacMan.x).toBe(30);
      store.pacMan.direction = 'LEFT';
      store.pacMan.nextDirection = 'LEFT';

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.x).toBe(30);
    });

    it('changes PacMans direction once it the way is free', () => {
      // Arrange
      const store = new GameStore();
      [store.pacMan.x, store.pacMan.y] = [32, 30];
      store.pacMan.direction = 'LEFT';
      store.pacMan.nextDirection = 'DOWN';

      // Act
      onTimeElapsed({ store, timestamp: 1 });

      // Assert
      expect(store.pacMan.x).toBe(30);
      expect(store.pacMan.x).toBe(30);
      expect(store.pacMan.direction).toBe('LEFT');

      // Act
      onTimeElapsed({ store, timestamp: 2 });

      // Assert
      expect(store.pacMan.direction).toBe('DOWN');
      expect(store.pacMan.x).toBe(30);
      expect(store.pacMan.y).toBe(32);
    });

    it('lets pac man eat basic pills', () => {
      // Arrange
      const BASIC_PILL_TX = 9;
      const BASIC_PILL_TY = 20;

      const store = new GameStore();
      [store.pacMan.x, store.pacMan.y] = screenFromTile(
        BASIC_PILL_TX,
        BASIC_PILL_TY - 1
      );
      store.pacMan.direction = 'DOWN';
      store.pacMan.nextDirection = 'DOWN';

      expect(store.pills[BASIC_PILL_TY][BASIC_PILL_TX]).toBe(BASIC_PILL_ID);

      // Act
      simulateFrames(10, store);

      // Assert
      expect(store.pacMan.x).toBe(screenFromTileCoordinate(BASIC_PILL_TX));
      expect(store.pacMan.y).toBe(screenFromTileCoordinate(BASIC_PILL_TY));

      expect(store.pills[BASIC_PILL_TY][BASIC_PILL_TX]).toBe(EMPTY_TILE_ID);

      expect(store.score).toBe(10);
    });

    xit('lets pac man die from meeting a ghost', () => {
      // Arrange
      const GHOST_TX = 1;
      const GHOST_TY = 1;

      const store = new GameStore();
      const ghost: Ghost = store.ghosts[0];
      [ghost.x, ghost.y] = screenFromTile(GHOST_TX, GHOST_TY);
      [store.pacMan.x, store.pacMan.y] = screenFromTile(GHOST_TX, GHOST_TY + 2);
      store.pacMan.direction = 'UP';
      store.pacMan.nextDirection = 'UP';

      // Act
      simulateFrames(20, store);

      // Assert
      expect(store.pacMan.x).toBe(screenFromTileCoordinate(GHOST_TX));
      expect(store.pacMan.y).toBe(screenFromTileCoordinate(GHOST_TY));

      expect(store.pills[GHOST_TY][GHOST_TX]).toBe(EMPTY_TILE_ID);
    });
  });
});
