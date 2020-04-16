import { Game } from './Game';
import { onAnimationFrame } from './onAnimationFrame';
import {
  getNewDirection,
  SPEED_FACTOR_HIGH,
  SPEED_FACTOR_NORMAL,
  SPEED_FACTOR_SLOW,
} from './updateGhosts';
import { simulateFramesToMoveNTiles, simulateFrames } from './simulateFrames';
import { Store } from './Store';
import { TILE_FOR_RETURNING_TO_BOX } from './chooseNewTargetTile';
import { SCREEN_TILE_SIZE } from './Coordinates';

const MILLISECONDS_PER_FRAME = 17;

describe('updateGhost', () => {
  describe('getNewDirection()', () => {
    it('returns the new direction to take', () => {
      const store = new Store();
      const game = new Game(store);

      const ghost = game.ghosts[0];
      ghost.send('PHASE_END');
      expect(ghost.state).toBe('chase');
      ghost.targetTile = { x: 6, y: 1 };
      ghost.setTileCoordinates({ x: 1, y: 1 });
      ghost.direction = 'UP';
      expect(getNewDirection(ghost)).toBe('RIGHT');
    });

    it('walks throught the tunnel to the RIGHT', () => {
      // Arrange

      const store = new Store();
      const game = new Game(store);

      const ghost = game.ghosts[0];
      ghost.send('PHASE_END');
      expect(ghost.state).toBe('chase');
      ghost.targetTile = { x: 4, y: 14 };
      ghost.setTileCoordinates({ x: 27, y: 14 });
      ghost.direction = 'RIGHT';

      // Act / Asset
      expect(getNewDirection(ghost)).toBe('RIGHT');

      // Arrange

      ghost.setTileCoordinates({ x: 26, y: 14 });
      ghost.direction = 'RIGHT';
      expect(getNewDirection(ghost)).toBe('RIGHT');
    });

    it('walks throught the tunnel to the LEFT', () => {
      // Arrange

      const store = new Store();
      const game = new Game(store);

      const ghost = game.ghosts[0];
      ghost.send('PHASE_END');
      expect(ghost.state).toBe('chase');
      ghost.targetTile = { x: 26, y: 14 };
      ghost.setTileCoordinates({ x: 0, y: 14 });
      ghost.direction = 'LEFT';

      // Act / Asset
      expect(getNewDirection(ghost)).toBe('LEFT');

      // Arrange

      ghost.setTileCoordinates({ x: 1, y: 14 });
      ghost.direction = 'LEFT';
      expect(getNewDirection(ghost)).toBe('LEFT');
    });
  });

  describe('updateGhost()', () => {
    it('advances ghost positions', () => {
      // Arrange

      const store = new Store();
      const game = new Game(store);

      game.pacMan.setTileCoordinates({ x: 1, y: 1 });
      expect(game.pacMan.screenCoordinates.x).toBe(20);
      game.pacMan.direction = 'LEFT';
      game.pacMan.nextDirection = 'LEFT';

      const ghost = game.ghosts[0];

      ghost.send('PHASE_END');
      expect(ghost.state).toBe('chase');
      ghost.setTileCoordinates({ x: 1, y: 3 });
      ghost.direction = 'UP';
      expect(ghost.screenCoordinates).toEqual({ x: 20, y: 60 });

      // Act
      simulateFrames(1, game);

      // Assert
      expect(ghost.screenCoordinates).toEqual({ x: 20, y: 58 });
    });

    describe('in chase state', () => {
      it('lets ghost 0 chase pacman', () => {
        // Arrange

        const store = new Store();
        const game = new Game(store);

        game.pacMan.setTileCoordinates({ x: 1, y: 8 });

        game.pacMan.direction = 'LEFT';
        game.pacMan.nextDirection = 'LEFT';

        const ghost = game.ghosts[0];
        ghost.send('PHASE_END');
        ghost.direction = 'LEFT';
        expect(ghost.state).toBe('chase');

        ghost.setTileCoordinates({ x: 3, y: 5 });

        expect(ghost.direction).toBe('LEFT');

        // Act
        simulateFramesToMoveNTiles(1, game);
        expect(ghost.direction).toBe('LEFT');
        expect(ghost.tileCoordinates).toEqual({ x: 2, y: 5 });
        expect(ghost.targetTile).toEqual({ x: 1, y: 8 });
        expect(ghost.wayPoints).toEqual([
          { x: 2, y: 5 },
          { x: 1, y: 5 },
          { x: 1, y: 6 },
          { x: 1, y: 7 },
          { x: 1, y: 8 },
        ]);
        expect(ghost.direction).toBe('LEFT');
        expect(ghost.state).toBe('chase');

        simulateFramesToMoveNTiles(1, game);
        expect(ghost.tileCoordinates).toEqual({ x: 1, y: 5 });

        simulateFramesToMoveNTiles(1, game);
        expect(ghost.tileCoordinates).toEqual({ x: 1, y: 6 });

        simulateFramesToMoveNTiles(1, game);
        expect(ghost.tileCoordinates).toEqual({ x: 1, y: 7 });

        simulateFramesToMoveNTiles(1, game);
        expect(ghost.tileCoordinates).toEqual({ x: 1, y: 7 });

        // Assert
        // We had a collision with pac man
        expect(game.pacMan.state).toBe('dead');
        expect(ghost.state).toBe('scatter');
      });

      it('lets ghost 0 go through the tunnel', () => {
        // Arrange

        const store = new Store();
        const game = new Game(store);

        game.pacMan.setTileCoordinates({ x: 27, y: 14 });

        game.pacMan.direction = 'RIGHT';
        game.pacMan.nextDirection = 'RIGHT';

        const ghost = game.ghosts[0];
        ghost.send('PHASE_END');
        expect(ghost.state).toBe('chase');

        ghost.setTileCoordinates({ x: 25, y: 14 });
        ghost.direction = 'RIGHT';

        // Act
        onAnimationFrame({ game, timestamp: MILLISECONDS_PER_FRAME });

        // Assert
        expect(ghost.targetTile).toEqual({ x: 27, y: 14 });
        expect(ghost.tileCoordinates).toEqual({ x: 25, y: 14 });
        expect(ghost.direction).toBe('RIGHT');

        // Act
        simulateFramesToMoveNTiles(1, game);

        // Assert
        expect(ghost.direction).toBe('RIGHT');
        expect(ghost.tileCoordinates).toEqual({ x: 25, y: 14 });

        // Act
        simulateFramesToMoveNTiles(2, game);

        // Assert
        expect(ghost.tileCoordinates).toEqual({ x: 26, y: 14 });

        // Act

        // Make sure we stay in the current state phase, which is  "chase"
        ghost.statePhaseTimer.restart();

        simulateFramesToMoveNTiles(1, game);
        simulateFramesToMoveNTiles(1, game);

        // Assert
        expect(ghost.tileCoordinates).toEqual({ x: 27, y: 14 });
        expect(ghost.direction).toBe('RIGHT');
        expect(game.pacMan.tileCoordinates).toEqual({ x: 4, y: 14 });
        expect(ghost.targetTile).toEqual({ x: 3, y: 14 });

        // Act
        simulateFramesToMoveNTiles(2, game);

        expect(ghost.state).toBe('chase');

        expect(game.pacMan.tileCoordinates).toEqual({ x: 6, y: 14 });

        // Assert
        expect(ghost.targetTile).toEqual({ x: 5, y: 14 });
        expect(ghost.tileCoordinates).toEqual({ x: 0, y: 14 });
        expect(ghost.direction).toBe('RIGHT');
        expect(game.pacMan.tileCoordinates).toEqual({ x: 6, y: 14 });
        expect(ghost.state).toBe('chase');
      });
    });

    describe('in scatter state', () => {
      it('lets ghost 0 go to the lower right corner', () => {
        // Arrange

        const store = new Store();
        const game = new Game(store);

        game.pacMan.setTileCoordinates({ x: 1, y: 8 });
        game.pacMan.direction = 'LEFT';
        game.pacMan.nextDirection = 'LEFT';

        const ghost = game.ghosts[0];
        expect(ghost.state).toBe('scatter');
        ghost.setTileCoordinates({ x: 24, y: 1 });
        ghost.direction = 'RIGHT';

        // Act
        onAnimationFrame({ game, timestamp: MILLISECONDS_PER_FRAME });

        expect(ghost.targetTile).toEqual({ x: 26, y: 1 });
        expect(ghost.wayPoints).toEqual([
          { x: 24, y: 1 },
          { x: 25, y: 1 },
          { x: 26, y: 1 },
        ]);

        expect(ghost.tileCoordinates).toEqual({ x: 24, y: 1 });
        simulateFramesToMoveNTiles(2, game);

        expect(ghost.tileCoordinates).toEqual({ x: 26, y: 1 });
        expect(ghost.direction).toBe('DOWN');
      });
    });

    describe('in dead state', () => {
      it('lets ghost go into the box', () => {
        // Arrange

        const store = new Store();
        const game = new Game(store);
        const ghost = game.ghosts[0];

        game.pacMan.setTileCoordinates({ x: 1, y: 8 });
        game.pacMan.direction = 'LEFT';
        game.pacMan.nextDirection = 'LEFT';

        ghost.direction = 'RIGHT';

        ghost.send('ENERGIZER_EATEN');
        ghost.send('COLLISION_WITH_PAC_MAN');
        expect(ghost.state).toBe('dead');
        ghost.setTileCoordinates({ x: 12, y: 11 });

        expect(ghost.atTileCenter).toBeTruthy();

        const simulateFramesToMoveGhostOneTile = () => {
          simulateFramesToMoveNTiles(0.5, game);
          expect(ghost.atTileCenter).toBeTruthy();
        };

        // Act
        simulateFramesToMoveGhostOneTile();
        expect(ghost.tileCoordinates).toEqual({ x: 13, y: 11 });

        simulateFramesToMoveGhostOneTile();
        expect(ghost.tileCoordinates).toEqual({ x: 13, y: 12 });

        expect(ghost.targetTile).toEqual(TILE_FOR_RETURNING_TO_BOX);
        expect(ghost.wayPoints).toEqual([
          {
            x: 13,
            y: 12,
          },
          {
            x: 13,
            y: 13,
          },
          {
            x: 13,
            y: 14,
          },
          TILE_FOR_RETURNING_TO_BOX,
        ]);

        // Act
        simulateFramesToMoveGhostOneTile();
        expect(ghost.tileCoordinates).toEqual({ x: 13, y: 13 });

        simulateFramesToMoveGhostOneTile();
        expect(ghost.tileCoordinates).toEqual({ x: 13, y: 14 });

        simulateFramesToMoveGhostOneTile();
        expect(ghost.tileCoordinates).toEqual(TILE_FOR_RETURNING_TO_BOX);

        expect(ghost.state).toBe('dead');
      });
    });
  });

  describe('speed factors', () => {
    const isValidSpeedFactor = (speedFactor: number): boolean => {
      const store = new Store();
      const game = new Game(store);
      const gameSpeed = game.speed;
      const ghostSpeed = gameSpeed * speedFactor;
      return SCREEN_TILE_SIZE % ghostSpeed === 0;
    };

    it('always keep the ghosts walking over tile centers', () => {
      expect(isValidSpeedFactor(SPEED_FACTOR_NORMAL)).toBeTruthy();
      expect(isValidSpeedFactor(SPEED_FACTOR_SLOW)).toBeTruthy();
      expect(isValidSpeedFactor(SPEED_FACTOR_HIGH)).toBeTruthy();
    });
  });
});
