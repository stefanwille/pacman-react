import { useGameStore } from './gameStore';

describe('PacMan state machine', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  describe('initial state', () => {
    it('starts in eating state', () => {
      const pacMan = useGameStore.getState().game.pacMan;
      expect(pacMan.state).toBe('eating');
    });
  });

  describe('ENERGIZER_EATEN event', () => {
    it('transitions from eating to chasing', () => {
      const store = useGameStore.getState();
      expect(store.game.pacMan.state).toBe('eating');

      store.sendPacManEvent('ENERGIZER_EATEN');

      expect(useGameStore.getState().game.pacMan.state).toBe('chasing');
    });

    it('starts the energizer timer', () => {
      const store = useGameStore.getState();
      expect(store.game.energizerTimer.running).toBe(false);

      store.sendPacManEvent('ENERGIZER_EATEN');

      const timer = useGameStore.getState().game.energizerTimer;
      expect(timer.running).toBe(true);
      expect(timer.timeSpent).toBe(0);
    });
  });

  describe('ENERGIZER_TIMED_OUT event', () => {
    it('transitions from chasing to eating', () => {
      const store = useGameStore.getState();
      store.sendPacManEvent('ENERGIZER_EATEN');
      expect(useGameStore.getState().game.pacMan.state).toBe('chasing');

      store.sendPacManEvent('ENERGIZER_TIMED_OUT');

      expect(useGameStore.getState().game.pacMan.state).toBe('eating');
    });

    it('does nothing in eating state', () => {
      const store = useGameStore.getState();
      expect(store.game.pacMan.state).toBe('eating');

      store.sendPacManEvent('ENERGIZER_TIMED_OUT');

      expect(useGameStore.getState().game.pacMan.state).toBe('eating');
    });
  });

  describe('COLLISION_WITH_GHOST event', () => {
    it('transitions from eating to dead', () => {
      const store = useGameStore.getState();
      expect(store.game.pacMan.state).toBe('eating');

      store.sendPacManEvent('COLLISION_WITH_GHOST');

      expect(useGameStore.getState().game.pacMan.state).toBe('dead');
    });

    it('records diedAtTimestamp', () => {
      const store = useGameStore.getState();
      store.advanceGame(0, 1000); // Set timestamp to 1000
      expect(useGameStore.getState().game.timestamp).toBe(1000);

      store.sendPacManEvent('COLLISION_WITH_GHOST');

      expect(useGameStore.getState().game.pacMan.diedAtTimestamp).toBe(1000);
    });
  });

  describe('REVIVED event', () => {
    it('transitions from dead to eating', () => {
      const store = useGameStore.getState();
      store.sendPacManEvent('COLLISION_WITH_GHOST');
      expect(useGameStore.getState().game.pacMan.state).toBe('dead');

      store.sendPacManEvent('REVIVED');

      expect(useGameStore.getState().game.pacMan.state).toBe('eating');
    });
  });

  describe('state transitions are idempotent for invalid events', () => {
    it('COLLISION_WITH_GHOST does nothing in chasing state', () => {
      const store = useGameStore.getState();
      store.sendPacManEvent('ENERGIZER_EATEN');
      expect(useGameStore.getState().game.pacMan.state).toBe('chasing');

      // PacMan can't die while chasing (eating energizer) - ghosts are frightened
      store.sendPacManEvent('COLLISION_WITH_GHOST');

      expect(useGameStore.getState().game.pacMan.state).toBe('chasing');
    });

    it('ENERGIZER_EATEN does nothing in dead state', () => {
      const store = useGameStore.getState();
      store.sendPacManEvent('COLLISION_WITH_GHOST');
      expect(useGameStore.getState().game.pacMan.state).toBe('dead');

      store.sendPacManEvent('ENERGIZER_EATEN');

      expect(useGameStore.getState().game.pacMan.state).toBe('dead');
    });
  });
});
