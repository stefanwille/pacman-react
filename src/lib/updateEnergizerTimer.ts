import { Game } from './Game';

export const updateEnergizerTimer = (game: Game) => {
  if (!game.energizerSinceTimestamp) {
    return;
  }
  game.energizerTotalTime += game.timeSinceLastFrame;
  const energizerEnded = game.timeToEnergizerEnd <= 0;
  if (energizerEnded) {
    game.stopEnergizer();
    game.pacMan.send('ENERGIZER_TIMED_OUT');
    for (const ghost of game.ghosts) {
      ghost.send('ENERGIZER_TIMED_OUT');
    }
  }
};
