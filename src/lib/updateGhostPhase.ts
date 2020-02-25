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

const ghostPhaseEnd = (game: Game) => {
  for (const ghost of game.ghosts) {
    ghost.send('PHASE_END');
  }
};

export const updateGhostPhase = action('updateGhostPhase', (game: Game) => {
  game.phaseTimerTimeLeft -= game.timeBetweenTicks;
  if (game.phaseTimerTimeLeft <= 0) {
    ghostPhaseEnd(game);
    game.phaseTimerTimeLeft = getPhaseLength(game);
  }
});
