import { action } from 'mobx';
import { Game } from './Game';
import { updateGhost } from './updateGhost';
import { updateGhostPhase } from './updateGhostPhase';
import { updatePacMan } from './updatePacMan';
import { detectCollisions } from './detectCollisions';

export const onTimeElapsed = action(
  'onTimeElapsed',
  ({ game, timestamp }: { game: Game; timestamp: number }) => {
    game.previousTimestamp = game.timestamp;
    game.timestamp = timestamp;
    if (game.gamePaused) {
      return;
    }

    updatePacMan(game);
    for (const ghost of game.ghosts) {
      updateGhost({ ghost });
    }

    detectCollisions(game);

    updateGhostPhase(game);
  }
);
