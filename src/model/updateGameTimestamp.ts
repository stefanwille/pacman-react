import { Game } from './Game';

export const updateGameTimestamp = (game: Game) => {
  game.timestamp += game.lastFrameLength;
  game.frameCount++;
};
