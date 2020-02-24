import { Game } from './Game';
import { action } from 'mobx';
import { MilliSeconds } from './Types';

export const HUNT_PHASE_LENGTH = 20 * 1000;
export const SCATTER_PHASE_LENGTH = 7 * 1000;

const getPhaseLength = (game: Game): MilliSeconds => {
  const newPhase = game.ghosts[0].state;
  const nextPhaseLengthInMillis =
    newPhase === 'hunt' ? HUNT_PHASE_LENGTH : SCATTER_PHASE_LENGTH;
  return nextPhaseLengthInMillis;
};

export const updateGhostPhase = action(
  'updateGhostPhase',
  ({ store }: { store: Game }) => {
    store.phaseTimerTimeLeft -= store.timeBetweenTicks;
    if (store.phaseTimerTimeLeft <= 0) {
      for (const ghost of store.ghosts) {
        ghost.send('PHASE_END');
      }
      store.phaseTimerTimeLeft = getPhaseLength(store);
    }
  }
);
