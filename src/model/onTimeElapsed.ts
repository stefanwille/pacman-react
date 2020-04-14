import { action } from 'mobx';
import { detectCollisions } from './detectCollisions';
import { Game } from './Game';
import { updateGhost } from './updateGhost';
import { updatePacMan } from './updatePacMan';
import { updateEnergizerTimer } from './updateEnergizerTimer';

export const onTimeElapsed = action(
  'onTimeElapsed',
  ({ game, timestamp }: { game: Game; timestamp: number }) => {
    updateGameTimestamp(game, timestamp);

    if (game.gamePaused) {
      return;
    }

    updateRoundRuntime(game);

    updateEnergizerTimer(game);

    updatePacMan(game);
    for (const ghost of game.ghosts) {
      updateGhost({ ghost });
    }

    if (game.pacMan.alive) {
      detectCollisions(game);
    }
  }
);

const updateGameTimestamp = (game: Game, timestamp: number) => {
  if (game.previousTimestamp === 0) {
    // The very first frame
    game.previousTimestamp = timestamp;
  } else {
    // A later frame.
    game.previousTimestamp = game.timestamp;
  }
  game.timestamp = timestamp;
  game.frameCount++;
};

const updateRoundRuntime = (game: Game) => {
  game.roundRuntime += game.timeSinceLastFrame;
};
