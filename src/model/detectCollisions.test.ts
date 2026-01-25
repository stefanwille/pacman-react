import { detectCollisions, BASIC_PILL_POINTS } from './detectCollisions';
import { EMPTY_TILE_ID } from './MazeData';
import { ENERGIZER_POINTS } from './eatEnergizer';
import { useGameStore, createInitialState } from './store';
import { screenFromTile } from './Coordinates';

// Helper to reset store before each test
const resetStore = () => {
  useGameStore.setState(createInitialState());
};

// Helper to set pacman position
const setPacManTileCoordinates = (tile: { x: number; y: number }) => {
  useGameStore.setState((state) => {
    state.game.pacMan.screenCoordinates = screenFromTile(tile);
  });
};

describe('detectCollisions', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('detectCollisions()', () => {
    describe('when hitting pill', () => {
      it('eats it', () => {
        setPacManTileCoordinates({ x: 12, y: 8 });
        expect(useGameStore.getState().game.score).toBe(0);
        detectCollisions();
        expect(useGameStore.getState().game.score).toBe(BASIC_PILL_POINTS);
      });
    });

    describe('when hitting energizer', () => {
      beforeEach(() => {
        // Arrange
        useGameStore.setState((state) => {
          state.game.timestamp = 1;
          state.game.killedGhosts = 1;
        });
        setPacManTileCoordinates({ x: 26, y: 3 });
        expect(useGameStore.getState().game.score).toBe(0);

        // Act
        detectCollisions();
      });

      it('eats it', () => {
        const state = useGameStore.getState();
        expect(state.game.score).toBe(ENERGIZER_POINTS);
        expect(state.game.maze.pills[3][26]).toBe(EMPTY_TILE_ID);
      });

      it('makes pacman chase', () => {
        const state = useGameStore.getState();
        expect(state.game.pacMan.state).toBe('chasing');
        expect(state.game.energizerTimer.running).toBeTruthy();
      });

      it('makes ghosts frightened', () => {
        const state = useGameStore.getState();
        expect(state.game.ghosts[0].state).toBe('frightened');
      });

      it('resets killed ghost counter', () => {
        const state = useGameStore.getState();
        expect(state.game.killedGhosts).toBe(0);
      });
    });
  });
});
