import { action } from 'mobx';
import { detectCollisions } from './detectCollisions';
import { Game } from './Game';
import { updateGhost } from './updateGhost';
import { updatePacMan } from './updatePacMan';
import { updateEnergizerTimer } from './updateEnergizerTimer';
import { MilliSeconds } from './Types';

// 1000 / 60
const AVERAGE_TIME_PER_FRAME: MilliSeconds = 17;

export const onTimeElapsed = action(
  'onTimeElapsed',
  ({ game, timestamp }: { game: Game; timestamp: number }) => {
    updateGameTimestamp(game, timestamp);

    if (game.gamePaused) {
      return;
    }

    updateRoundTime(game);

    updateEnergizerTimer(game);

    updatePacMan(game);
    // TODO: Add function 'updateGhosts()'
    for (const ghost of game.ghosts) {
      updateGhost({ ghost });
    }

    // TODO: Move this 'if' to detectCollisions
    if (game.pacMan.alive) {
      detectCollisions(game);
    }
  }
);

// Extract this function
const updateGameTimestamp = (game: Game, timestamp: number) => {
  if (game.timestamp === 0) {
    // This is the very first frame
    game.previousTimestamp = timestamp - AVERAGE_TIME_PER_FRAME;
  } else {
    // Later frames
    game.previousTimestamp = game.timestamp;
  }
  game.timestamp = timestamp;
};

const updateRoundTime = (game: Game) => {
  // A later frame.
  game.roundRuntime += game.timeSinceLastFrame;
  game.frameCount++;
  return true;
};
