import { action } from 'mobx';
import { Ghost } from './Ghost';
import { MilliSeconds } from './Types';

export const HUNT_PHASE_LENGTH = 20 * 1000;
export const SCATTER_PHASE_LENGTH = 7 * 1000;

export const updateGhostPhaseTimer = action(
  'updateGhostPhaseTimer',
  (ghost: Ghost) => {
    ghost.phaseTimerTimeLeft -= ghost.game.timeBetweenTicks;
  }
);

export const updateGhostPhase = action('updateGhostPhase', (ghost: Ghost) => {
  if (ghost.phaseTimerTimeLeft <= 0) {
    ghost.send('PHASE_END');
    ghost.phaseTimerTimeLeft = getPhaseLength(ghost);
  }
});

const getPhaseLength = (ghost: Ghost): MilliSeconds => {
  const nextPhaseLengthInMillis =
    ghost.state === 'hunt' ? HUNT_PHASE_LENGTH : SCATTER_PHASE_LENGTH;
  return nextPhaseLengthInMillis;
};
