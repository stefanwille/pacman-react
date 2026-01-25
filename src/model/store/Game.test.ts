import { useGameStore } from './gameStore';
import { DEFAULT_SPEED } from './constants';
import { SCREEN_TILE_SIZE } from '../Coordinates';

describe('Game', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  describe('initial state', () => {
    it('has initial score of 0', () => {
      expect(useGameStore.getState().game.score).toBe(0);
    });

    it('has initial killedGhosts of 0', () => {
      expect(useGameStore.getState().game.killedGhosts).toBe(0);
    });

    it('has gamePaused set to false', () => {
      expect(useGameStore.getState().game.gamePaused).toBe(false);
    });

    it('has 4 ghosts', () => {
      expect(useGameStore.getState().game.ghosts).toHaveLength(4);
    });

    it('has default speed', () => {
      expect(useGameStore.getState().game.speed).toBe(DEFAULT_SPEED);
    });
  });

  describe('resetGame', () => {
    it('resets score to 0', () => {
      useGameStore.getState().addScore(500);
      expect(useGameStore.getState().game.score).toBe(500);

      useGameStore.getState().resetGame();

      expect(useGameStore.getState().game.score).toBe(0);
    });

    it('resets killedGhosts to 0', () => {
      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'ENERGIZER_EATEN');
      store.sendGhostEvent(0, 'COLLISION_WITH_PAC_MAN');
      expect(useGameStore.getState().game.killedGhosts).toBe(1);

      store.resetGame();

      expect(useGameStore.getState().game.killedGhosts).toBe(0);
    });

    it('resets pacMan state to eating', () => {
      const store = useGameStore.getState();
      store.sendPacManEvent('COLLISION_WITH_GHOST');
      expect(useGameStore.getState().game.pacMan.state).toBe('dead');

      store.resetGame();

      expect(useGameStore.getState().game.pacMan.state).toBe('eating');
    });

    it('resets ghost states to scatter', () => {
      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'PHASE_END');
      expect(useGameStore.getState().game.ghosts[0].state).toBe('chase');

      store.resetGame();

      expect(useGameStore.getState().game.ghosts[0].state).toBe('scatter');
    });
  });

  describe('advanceGame', () => {
    it('updates timestamp', () => {
      expect(useGameStore.getState().game.timestamp).toBe(0);

      useGameStore.getState().advanceGame(100, 16);

      expect(useGameStore.getState().game.timestamp).toBe(16);
    });

    it('updates lastFrameLength', () => {
      useGameStore.getState().advanceGame(100, 16);

      expect(useGameStore.getState().game.lastFrameLength).toBe(16);
    });

    it('increments frameCount', () => {
      expect(useGameStore.getState().game.frameCount).toBe(0);

      useGameStore.getState().advanceGame(100, 16);
      useGameStore.getState().advanceGame(116, 16);

      expect(useGameStore.getState().game.frameCount).toBe(2);
    });
  });

  describe('addScore', () => {
    it('adds points to score', () => {
      useGameStore.getState().addScore(10);
      expect(useGameStore.getState().game.score).toBe(10);

      useGameStore.getState().addScore(50);
      expect(useGameStore.getState().game.score).toBe(60);
    });
  });

  describe('setGamePaused', () => {
    it('sets gamePaused to false', () => {
      useGameStore.getState().setGamePaused(false);
      expect(useGameStore.getState().game.gamePaused).toBe(false);
    });

    it('sets gamePaused to true', () => {
      useGameStore.getState().setGamePaused(false);
      useGameStore.getState().setGamePaused(true);
      expect(useGameStore.getState().game.gamePaused).toBe(true);
    });
  });

  describe('DEFAULT_SPEED', () => {
    it('must be a divisor of TILE_SIZE for movement logic', () => {
      expect(SCREEN_TILE_SIZE % DEFAULT_SPEED).toBe(0);
    });
  });
});
