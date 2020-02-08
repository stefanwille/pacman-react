import { GameStore } from './GameStore';
import { action } from 'mobx';

const GHOST_PHASE_LENGTH_IN_MILLIS = 5 * 1000;

export const updateGhostPhase = action(
  'updateGhostPhase',
  ({ store }: { store: GameStore }) => {
    store.phaseTimerTimeLeft -= store.timeBetweenTicks;
    if (store.phaseTimerTimeLeft <= 0) {
      store.phaseTimerTimeLeft = GHOST_PHASE_LENGTH_IN_MILLIS;
      for (const ghost of store.ghosts) {
        ghost.send('PHASE_END');
      }
    }
  }
);
