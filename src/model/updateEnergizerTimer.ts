import { useGameStore } from './store';

export const updateEnergizerTimer = () => {
  const store = useGameStore.getState();
  const timer = store.game.energizerTimer;

  if (!timer.running) {
    return;
  }

  const lastFrameLength = store.game.lastFrameLength;

  useGameStore.setState((state) => {
    state.game.energizerTimer.timeSpent += lastFrameLength;
  });

  // Check if timed out after the update
  const updatedStore = useGameStore.getState();
  const updatedTimer = updatedStore.game.energizerTimer;

  if (updatedTimer.timeSpent >= updatedTimer.duration) {
    // Handle energizer timed out
    handleEnergizerTimedOut();

    // Stop the timer
    useGameStore.setState((state) => {
      state.game.energizerTimer.running = false;
    });
  }
};

const handleEnergizerTimedOut = () => {
  const store = useGameStore.getState();

  // Send ENERGIZER_TIMED_OUT to PacMan
  store.sendPacManEvent('ENERGIZER_TIMED_OUT');

  // Send ENERGIZER_TIMED_OUT to all ghosts
  store.game.ghosts.forEach((_, index) => {
    store.sendGhostEvent(index, 'ENERGIZER_TIMED_OUT');
  });
};
