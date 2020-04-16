import { Game } from './Game';
import { onTimeElapsed } from './onTimeElapsed';
import { MilliSeconds } from './Types';
import { SCREEN_TILE_SIZE } from './Coordinates';

export const FRAME_LENGTH: MilliSeconds = Math.ceil(1000 / 60);

const framesPerTile = (game: Game) => SCREEN_TILE_SIZE / game.speed;

export const simulateTimeElapsed = (milliSeconds: MilliSeconds, game: Game) => {
  onTimeElapsed({
    game,
    timestamp: game.externalTimeStamp + milliSeconds,
  });
};

export const simulateFrames = (numberOfFrames: number, game: Game) => {
  for (let frames = 0; frames < numberOfFrames; frames++) {
    simulateTimeElapsed(1 + frames * FRAME_LENGTH, game);
  }
};

export const simulateFramesToMoveNTiles = (
  numberOfTiles: number,
  game: Game
) => {
  const numberOfFrames = numberOfTiles * framesPerTile(game);
  simulateFrames(numberOfFrames, game);
};
