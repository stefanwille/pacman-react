import { action } from 'mobx';
import { Ghost } from './Ghost';
import { MilliSeconds } from './Types';
import { StateValue } from 'xstate';

export const CHASE_PHASE_LENGTH = 20 * 1000;
export const SCATTER_PHASE_LENGTH = 7 * 1000;

export const updateGhostPhaseTime = action(
  'updateGhostPhaseTimer',
  (ghost: Ghost) => {
    ghost.phaseTimer.advance(ghost.game.timeSinceLastFrame);
  }
);

export const updateGhostPhase = action('updateGhostPhase', (ghost: Ghost) => {
  if (ghost.phaseTimer.isTimedOut) {
    console.log('timedOut');
    ghost.send('PHASE_END');
    ghost.phaseTimer.setDuration(getPhaseLength(ghost.state));
    ghost.phaseTimer.reset();
  }
});

export const getPhaseLength = (state: StateValue): MilliSeconds => {
  switch (state) {
    case 'chase':
      return CHASE_PHASE_LENGTH;
    case 'scatter':
      return SCATTER_PHASE_LENGTH;
    default:
      // Never ends
      return 9999999999;
  }
};
