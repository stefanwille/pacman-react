import { onAnimationFrame } from './onAnimationFrame';
import {
  getNewDirection,
  SPEED_FACTOR_HIGH,
  SPEED_FACTOR_NORMAL,
  SPEED_FACTOR_SLOW,
} from './updateGhosts';
import { simulateFramesToMoveNTiles, simulateFrames } from './simulateFrames';
import { TILE_FOR_RETURNING_TO_BOX } from './chooseNewTargetTile';
import { SCREEN_TILE_SIZE, screenFromTile, tileFromScreen } from './Coordinates';
import { useGameStore, createGhostData, createInitialState } from './store';

const MILLISECONDS_PER_FRAME = 17;

const resetStore = () => {
  useGameStore.setState(createInitialState());
};

describe('updateGhost', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('getNewDirection()', () => {
    it('returns the new direction to take', () => {
      const store = useGameStore.getState();

      // Set ghost 0 to chase state
      store.sendGhostEvent(0, 'PHASE_END');
      let ghost = useGameStore.getState().game.ghosts[0];
      expect(ghost.state).toBe('chase');

      // Set target tile and position
      useGameStore.setState((state) => {
        state.game.ghosts[0].targetTile = { x: 6, y: 1 };
        state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 1, y: 1 });
        state.game.ghosts[0].direction = 'UP';
      });

      const ghostData = createGhostData(0);
      expect(getNewDirection(ghostData)).toBe('RIGHT');
    });

    it('walks throught the tunnel to the RIGHT', () => {
      // Arrange
      const store = useGameStore.getState();

      store.sendGhostEvent(0, 'PHASE_END');
      let ghost = useGameStore.getState().game.ghosts[0];
      expect(ghost.state).toBe('chase');

      useGameStore.setState((state) => {
        state.game.ghosts[0].targetTile = { x: 4, y: 14 };
        state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 27, y: 14 });
        state.game.ghosts[0].direction = 'RIGHT';
      });

      // Act / Asset
      let ghostData = createGhostData(0);
      expect(getNewDirection(ghostData)).toBe('RIGHT');

      // Arrange
      useGameStore.setState((state) => {
        state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 26, y: 14 });
        state.game.ghosts[0].direction = 'RIGHT';
      });
      ghostData = createGhostData(0);
      expect(getNewDirection(ghostData)).toBe('RIGHT');
    });

    it('walks throught the tunnel to the LEFT', () => {
      // Arrange
      const store = useGameStore.getState();

      store.sendGhostEvent(0, 'PHASE_END');
      let ghost = useGameStore.getState().game.ghosts[0];
      expect(ghost.state).toBe('chase');

      useGameStore.setState((state) => {
        state.game.ghosts[0].targetTile = { x: 26, y: 14 };
        state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 0, y: 14 });
        state.game.ghosts[0].direction = 'LEFT';
      });

      // Act / Asset
      let ghostData = createGhostData(0);
      expect(getNewDirection(ghostData)).toBe('LEFT');

      // Arrange
      useGameStore.setState((state) => {
        state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 1, y: 14 });
        state.game.ghosts[0].direction = 'LEFT';
      });
      ghostData = createGhostData(0);
      expect(getNewDirection(ghostData)).toBe('LEFT');
    });
  });

  describe('updateGhost()', () => {
    it('advances ghost positions', () => {
      // Arrange
      useGameStore.setState((state) => {
        state.game.pacMan.screenCoordinates = screenFromTile({ x: 1, y: 1 });
        state.game.pacMan.direction = 'LEFT';
        state.game.pacMan.nextDirection = 'LEFT';
      });

      const pacMan = useGameStore.getState().game.pacMan;
      expect(pacMan.screenCoordinates.x).toBe(20);

      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'PHASE_END');
      expect(useGameStore.getState().game.ghosts[0].state).toBe('chase');

      useGameStore.setState((state) => {
        state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 1, y: 3 });
        state.game.ghosts[0].direction = 'UP';
      });

      const ghost = useGameStore.getState().game.ghosts[0];
      expect(ghost.screenCoordinates).toEqual({ x: 20, y: 60 });

      // Act
      simulateFrames(1);

      // Assert
      const updatedGhost = useGameStore.getState().game.ghosts[0];
      expect(updatedGhost.screenCoordinates).toEqual({ x: 20, y: 58 });
    });

    describe('in chase state', () => {
      it('lets ghost 0 chase pacman', () => {
        // Arrange
        useGameStore.setState((state) => {
          state.game.pacMan.screenCoordinates = screenFromTile({ x: 1, y: 8 });
          state.game.pacMan.direction = 'LEFT';
          state.game.pacMan.nextDirection = 'LEFT';
        });

        const store = useGameStore.getState();
        store.sendGhostEvent(0, 'PHASE_END');

        useGameStore.setState((state) => {
          state.game.ghosts[0].direction = 'LEFT';
          state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 3, y: 5 });
        });

        let ghost = useGameStore.getState().game.ghosts[0];
        expect(ghost.state).toBe('chase');
        expect(ghost.direction).toBe('LEFT');

        // Act
        simulateFramesToMoveNTiles(1);
        ghost = useGameStore.getState().game.ghosts[0];
        expect(ghost.direction).toBe('LEFT');
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 2, y: 5 });
        expect(ghost.targetTile).toEqual({ x: 1, y: 8 });

        expect(ghost.direction).toBe('LEFT');
        expect(ghost.state).toBe('chase');

        simulateFramesToMoveNTiles(1);
        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 1, y: 5 });

        simulateFramesToMoveNTiles(1);
        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 1, y: 6 });

        simulateFramesToMoveNTiles(1);
        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 1, y: 7 });

        simulateFramesToMoveNTiles(1);
        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 1, y: 7 });

        // Assert
        // We had a collision with pac man
        const pacMan = useGameStore.getState().game.pacMan;
        expect(pacMan.state).toBe('dead');
        ghost = useGameStore.getState().game.ghosts[0];
        expect(ghost.state).toBe('scatter');
      });

      it('lets ghost 0 go through the tunnel', () => {
        // Arrange
        useGameStore.setState((state) => {
          state.game.pacMan.screenCoordinates = screenFromTile({ x: 27, y: 14 });
          state.game.pacMan.direction = 'RIGHT';
          state.game.pacMan.nextDirection = 'RIGHT';
        });

        const store = useGameStore.getState();
        store.sendGhostEvent(0, 'PHASE_END');
        expect(useGameStore.getState().game.ghosts[0].state).toBe('chase');

        useGameStore.setState((state) => {
          state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 25, y: 14 });
          state.game.ghosts[0].direction = 'RIGHT';
        });

        // Act
        onAnimationFrame(MILLISECONDS_PER_FRAME);

        // Assert
        let ghost = useGameStore.getState().game.ghosts[0];
        expect(ghost.targetTile).toEqual({ x: 27, y: 14 });
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 25, y: 14 });
        expect(ghost.direction).toBe('RIGHT');

        // Act
        simulateFramesToMoveNTiles(1);

        // Assert
        ghost = useGameStore.getState().game.ghosts[0];
        expect(ghost.direction).toBe('RIGHT');
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 25, y: 14 });

        // Act
        simulateFramesToMoveNTiles(2);

        // Assert
        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 26, y: 14 });

        // Act
        // Make sure we stay in the current state phase, which is "chase"
        useGameStore.setState((state) => {
          const timer = state.game.ghosts[0].statePhaseTimer;
          timer.timeSpent = 0;
        });

        simulateFramesToMoveNTiles(1);
        simulateFramesToMoveNTiles(1);

        // Assert
        ghost = useGameStore.getState().game.ghosts[0];
        const pacMan = useGameStore.getState().game.pacMan;
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 27, y: 14 });
        expect(ghost.direction).toBe('RIGHT');
        expect(tileFromScreen(pacMan.screenCoordinates)).toEqual({ x: 4, y: 14 });
        expect(ghost.targetTile).toEqual({ x: 3, y: 14 });

        // Act
        simulateFramesToMoveNTiles(2);

        ghost = useGameStore.getState().game.ghosts[0];
        expect(ghost.state).toBe('chase');

        const pacManAfter = useGameStore.getState().game.pacMan;
        expect(tileFromScreen(pacManAfter.screenCoordinates)).toEqual({ x: 6, y: 14 });

        // Assert
        ghost = useGameStore.getState().game.ghosts[0];
        expect(ghost.targetTile).toEqual({ x: 5, y: 14 });
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 0, y: 14 });
        expect(ghost.direction).toBe('RIGHT');
        expect(tileFromScreen(pacManAfter.screenCoordinates)).toEqual({ x: 6, y: 14 });
        expect(ghost.state).toBe('chase');
      });
    });

    describe('in scatter state', () => {
      it('lets ghost 0 go to the lower right corner', () => {
        // Arrange
        useGameStore.setState((state) => {
          state.game.pacMan.screenCoordinates = screenFromTile({ x: 1, y: 8 });
          state.game.pacMan.direction = 'LEFT';
          state.game.pacMan.nextDirection = 'LEFT';
        });

        let ghost = useGameStore.getState().game.ghosts[0];
        expect(ghost.state).toBe('scatter');

        useGameStore.setState((state) => {
          state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 24, y: 1 });
          state.game.ghosts[0].direction = 'RIGHT';
        });

        // Act
        onAnimationFrame(MILLISECONDS_PER_FRAME);

        ghost = useGameStore.getState().game.ghosts[0];
        expect(ghost.targetTile).toEqual({ x: 26, y: 1 });

        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 24, y: 1 });
        simulateFramesToMoveNTiles(2);

        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 26, y: 1 });
        expect(ghost.direction).toBe('DOWN');
      });
    });

    describe('in dead state', () => {
      it('lets ghost go into the box', () => {
        // Arrange
        useGameStore.setState((state) => {
          state.game.pacMan.screenCoordinates = screenFromTile({ x: 1, y: 8 });
          state.game.pacMan.direction = 'LEFT';
          state.game.pacMan.nextDirection = 'LEFT';
          state.game.ghosts[0].direction = 'RIGHT';
        });

        const store = useGameStore.getState();
        store.sendGhostEvent(0, 'ENERGIZER_EATEN');
        store.sendGhostEvent(0, 'COLLISION_WITH_PAC_MAN');
        expect(useGameStore.getState().game.ghosts[0].state).toBe('dead');

        useGameStore.setState((state) => {
          state.game.ghosts[0].screenCoordinates = screenFromTile({ x: 12, y: 11 });
        });

        let ghostData = createGhostData(0);
        expect(ghostData.atTileCenter).toBeTruthy();

        const simulateFramesToMoveGhostOneTile = () => {
          simulateFramesToMoveNTiles(0.5);
          ghostData = createGhostData(0);
          expect(ghostData.atTileCenter).toBeTruthy();
        };

        // Act
        simulateFramesToMoveGhostOneTile();
        let ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 13, y: 11 });

        simulateFramesToMoveGhostOneTile();
        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 13, y: 12 });

        expect(ghost.targetTile).toEqual(TILE_FOR_RETURNING_TO_BOX);

        // Act
        simulateFramesToMoveGhostOneTile();
        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 13, y: 13 });

        simulateFramesToMoveGhostOneTile();
        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual({ x: 13, y: 14 });

        simulateFramesToMoveGhostOneTile();
        ghost = useGameStore.getState().game.ghosts[0];
        expect(tileFromScreen(ghost.screenCoordinates)).toEqual(TILE_FOR_RETURNING_TO_BOX);

        expect(ghost.state).toBe('dead');
      });
    });
  });

  describe('speed factors', () => {
    const isValidSpeedFactor = (speedFactor: number): boolean => {
      const gameSpeed = useGameStore.getState().game.speed;
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
