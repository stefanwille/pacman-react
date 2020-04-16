import { Game } from './Game';

export const updateEnergizerTimer = (game: Game) => {
  game.energizerTimer.advance(game.lastFrameLength);
};
