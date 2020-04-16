import { Game } from './Game';

export const updateGameTimestamp = (game: Game) => {
  game.timestamp += game.timeSinceLastFrame;
  game.frameCount++;
};
