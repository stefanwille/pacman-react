import { action } from 'mobx';
import { Ghost } from './Ghost';
import { MilliSeconds } from './Types';
import { StateValue } from 'xstate';

export const HUNT_PHASE_LENGTH = 20 * 1000;
export const SCATTER_PHASE_LENGTH = 7 * 1000;

export const updateGhostPhaseTime = action(
  'updateGhostPhaseTimer',
  (ghost: Ghost) => {
    ghost.phaseTime += ghost.game.timeBetweenTicks;
  }
);

export const updateGhostPhase = action('updateGhostPhase', (ghost: Ghost) => {
  const phaseLength = getPhaseLength(ghost.state);
  if (ghost.phaseTime >= phaseLength) {
    ghost.send('PHASE_END');
    ghost.phaseTime = 0;
  }
});

const getPhaseLength = (state: StateValue): MilliSeconds =>
  state === 'hunt' ? HUNT_PHASE_LENGTH : SCATTER_PHASE_LENGTH;
