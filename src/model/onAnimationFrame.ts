import { action } from 'mobx';
import { detectCollisions } from './detectCollisions';
import { Game } from './Game';
import { updateGhosts } from './updateGhosts';
import { updatePacMan } from './updatePacMan';
import { updateEnergizerTimer } from './updateEnergizerTimer';
import { updateExternalTimestamp } from './updateExternalTimeStamp';
import { updateGameTimestamp } from './updateGameTimestamp';

export const onAnimationFrame = action(
  'onAnimationFrame',
  ({ game, timestamp }: { game: Game; timestamp: number }) => {
    updateExternalTimestamp({ game, externalTimeStamp: timestamp });

    if (game.gamePaused) {
      return;
    }

    updateGameTimestamp(game);
    updateEnergizerTimer(game);
    updatePacMan(game);
    updateGhosts(game);
    detectCollisions(game);
  }
);
