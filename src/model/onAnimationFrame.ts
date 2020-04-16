import { action } from 'mobx';
import { detectCollisions } from './detectCollisions';
import { Game } from './Game';
import { updateGhosts } from './updateGhosts';
import { updatePacMan } from './updatePacMan';
import { updateEnergizerTimer } from './updateEnergizerTimer';
import { MilliSeconds } from './Types';
import { updateExternalTimestamp } from './updateExternalTimeStamp';

export const TYPICAL_FRAME_DURATION: MilliSeconds = 17;

export const onAnimationFrame = action(
  'onAnimationFrame',
  ({ game, timestamp }: { game: Game; timestamp: number }) => {
    updateExternalTimestamp({ game, externalTimeStamp: timestamp });

    if (game.gamePaused) {
      return;
    }

    updateGameTime(game);

    updateEnergizerTimer(game);

    updatePacMan(game);

    updateGhosts(game);

    detectCollisions(game);
  }
);

// TODO: Extract this function
const updateGameTime = (game: Game) => {
  game.timestamp += game.timeSinceLastFrame;
  game.frameCount++;
  return true;
};
