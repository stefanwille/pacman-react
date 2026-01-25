import { useGameStore } from './gameStore';
import { KILL_GHOST_SCORE } from './constants';

describe('Ghost state machine', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  describe('initial state', () => {
    it('starts in scatter state', () => {
      const ghost = useGameStore.getState().game.ghosts[0];
      expect(ghost.state).toBe('scatter');
    });
  });

  describe('ENERGIZER_EATEN event', () => {
    it('transitions from scatter to frightened', () => {
      const store = useGameStore.getState();
      expect(store.game.ghosts[0].state).toBe('scatter');

      store.sendGhostEvent(0, 'ENERGIZER_EATEN');

      expect(useGameStore.getState().game.ghosts[0].state).toBe('frightened');
    });

    it('transitions from chase to frightened', () => {
      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'PHASE_END'); // scatter -> chase
      expect(useGameStore.getState().game.ghosts[0].state).toBe('chase');

      store.sendGhostEvent(0, 'ENERGIZER_EATEN');

      expect(useGameStore.getState().game.ghosts[0].state).toBe('frightened');
    });

    it('tracks previous state before frightened', () => {
      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'PHASE_END'); // scatter -> chase
      store.sendGhostEvent(0, 'ENERGIZER_EATEN');

      const ghost = useGameStore.getState().game.ghosts[0];
      expect(ghost.state).toBe('frightened');
      expect(ghost.previousStateBeforeFrightened).toBe('chase');
    });
  });

  describe('PHASE_END event', () => {
    it('transitions from scatter to chase', () => {
      const store = useGameStore.getState();
      expect(store.game.ghosts[0].state).toBe('scatter');

      store.sendGhostEvent(0, 'PHASE_END');

      expect(useGameStore.getState().game.ghosts[0].state).toBe('chase');
    });

    it('transitions from chase to scatter', () => {
      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'PHASE_END'); // scatter -> chase
      expect(useGameStore.getState().game.ghosts[0].state).toBe('chase');

      store.sendGhostEvent(0, 'PHASE_END');

      expect(useGameStore.getState().game.ghosts[0].state).toBe('scatter');
    });
  });

  describe('when ghost is killed (COLLISION_WITH_PAC_MAN while frightened)', () => {
    beforeEach(() => {
      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'ENERGIZER_EATEN');
      expect(useGameStore.getState().game.ghosts[0].state).toBe('frightened');
    });

    it('transitions to dead state', () => {
      useGameStore.getState().sendGhostEvent(0, 'COLLISION_WITH_PAC_MAN');

      expect(useGameStore.getState().game.ghosts[0].state).toBe('dead');
    });

    it('increments killedGhosts', () => {
      expect(useGameStore.getState().game.killedGhosts).toBe(0);

      useGameStore.getState().sendGhostEvent(0, 'COLLISION_WITH_PAC_MAN');

      expect(useGameStore.getState().game.killedGhosts).toBe(1);
    });

    it('adds score based on kill count', () => {
      expect(useGameStore.getState().game.score).toBe(0);

      useGameStore.getState().sendGhostEvent(0, 'COLLISION_WITH_PAC_MAN');

      expect(useGameStore.getState().game.score).toBe(KILL_GHOST_SCORE[1]);
    });

    it('score increases 100, 200, 400, 800 for consecutive kills', () => {
      const store = useGameStore.getState();

      // Kill first ghost
      store.sendGhostEvent(0, 'COLLISION_WITH_PAC_MAN');
      expect(useGameStore.getState().game.score).toBe(100);

      // Kill second ghost
      store.sendGhostEvent(1, 'ENERGIZER_EATEN');
      store.sendGhostEvent(1, 'COLLISION_WITH_PAC_MAN');
      expect(useGameStore.getState().game.score).toBe(100 + 200);

      // Kill third ghost
      store.sendGhostEvent(2, 'ENERGIZER_EATEN');
      store.sendGhostEvent(2, 'COLLISION_WITH_PAC_MAN');
      expect(useGameStore.getState().game.score).toBe(100 + 200 + 400);

      // Kill fourth ghost
      store.sendGhostEvent(3, 'ENERGIZER_EATEN');
      store.sendGhostEvent(3, 'COLLISION_WITH_PAC_MAN');
      expect(useGameStore.getState().game.score).toBe(100 + 200 + 400 + 800);
    });

    it('sets deadWaitingTimeInBoxLeft', () => {
      useGameStore.getState().sendGhostEvent(0, 'COLLISION_WITH_PAC_MAN');

      expect(useGameStore.getState().game.ghosts[0].deadWaitingTimeInBoxLeft).toBe(3000);
    });
  });

  describe('REVIVED event', () => {
    it('transitions from dead to scatter', () => {
      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'ENERGIZER_EATEN');
      store.sendGhostEvent(0, 'COLLISION_WITH_PAC_MAN');
      expect(useGameStore.getState().game.ghosts[0].state).toBe('dead');

      store.sendGhostEvent(0, 'REVIVED');

      expect(useGameStore.getState().game.ghosts[0].state).toBe('scatter');
    });
  });

  describe('RESET event', () => {
    it('resets ghost to initial scatter state from any state', () => {
      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'PHASE_END'); // scatter -> chase
      store.sendGhostEvent(0, 'ENERGIZER_EATEN'); // chase -> frightened
      expect(useGameStore.getState().game.ghosts[0].state).toBe('frightened');

      store.sendGhostEvent(0, 'RESET');

      expect(useGameStore.getState().game.ghosts[0].state).toBe('scatter');
    });
  });

  describe('ENERGIZER_TIMED_OUT event', () => {
    it('transitions from frightened to chase', () => {
      const store = useGameStore.getState();
      store.sendGhostEvent(0, 'ENERGIZER_EATEN');
      expect(useGameStore.getState().game.ghosts[0].state).toBe('frightened');

      store.sendGhostEvent(0, 'ENERGIZER_TIMED_OUT');

      expect(useGameStore.getState().game.ghosts[0].state).toBe('chase');
    });
  });
});
