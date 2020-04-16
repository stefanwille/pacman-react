import { action } from 'mobx';
import { Ghost } from './Ghost';
import { MilliSeconds } from './Types';
import { StateValue } from 'xstate';

export const CHASE_PHASE_LENGTH = 20 * 1000;
export const SCATTER_PHASE_LENGTH = 7 * 1000;

export const updateGhostStatePhaseTime = action(
  'updateGhostStatePhaseTime',
  (ghost: Ghost) => {
    ghost.statePhaseTimer.advance(ghost.game.lastFrameLength);
  }
);

export const updateGhostStatePhase = action(
  'updateGhostStatePhase',
  (ghost: Ghost) => {
    if (!ghost.atTileCenter) {
      return;
    }

    if (ghost.statePhaseTimer.isTimedOut) {
      ghost.send('PHASE_END');
      ghost.statePhaseTimer.setDuration(getStatePhaseLength(ghost.state));
      ghost.statePhaseTimer.restart();
    }
  }
);

export const getStatePhaseLength = (state: StateValue): MilliSeconds => {
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
