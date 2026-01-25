import { useGameStore } from './store';

export const ENERGIZER_POINTS = 30;

export const eatEnergizer = () => {
  const store = useGameStore.getState();

  // Update score and reset killed ghosts
  useGameStore.setState((state) => {
    state.game.score += ENERGIZER_POINTS;
    state.game.killedGhosts = 0;
  });

  // Send ENERGIZER_EATEN to PacMan
  store.sendPacManEvent('ENERGIZER_EATEN');

  // Send ENERGIZER_EATEN to all ghosts
  store.game.ghosts.forEach((_, index) => {
    store.sendGhostEvent(index, 'ENERGIZER_EATEN');
  });
};
