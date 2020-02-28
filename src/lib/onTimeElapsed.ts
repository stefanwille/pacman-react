import { action } from 'mobx';
import { detectCollisions } from './detectCollisions';
import { Game } from './Game';
import { updateGhost } from './updateGhost';
import { updatePacMan } from './updatePacMan';

export const onTimeElapsed = action(
  'onTimeElapsed',
  ({ game, timestamp }: { game: Game; timestamp: number }) => {
    if (game.gamePaused) {
      return;
    }

    game.previousTimestamp = game.timestamp;
    game.timestamp = timestamp;
    game.frameCount++;
    if (game.gamePaused) {
      return;
    }

    updatePacMan(game);
    for (const ghost of game.ghosts) {
      updateGhost({ ghost });
    }

    detectCollisions(game);
  }
);
