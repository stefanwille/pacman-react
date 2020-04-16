import { Game } from './Game';
import { onAnimationFrame, TYPICAL_FRAME_DURATION } from './onAnimationFrame';
import { MilliSeconds } from './Types';
import { SCREEN_TILE_SIZE } from './Coordinates';

const framesPerTile = (game: Game) => SCREEN_TILE_SIZE / game.speed;

export const simulateTimeElapsed = (frameLength: MilliSeconds, game: Game) => {
  const previousTimestamp = game.externalTimeStamp ?? 0;
  const timestamp = previousTimestamp + frameLength;
  onAnimationFrame({
    game,
    timestamp,
  });
};

export const simulateFrames = (numberOfFrames: number, game: Game) => {
  for (let frames = 0; frames < numberOfFrames; frames++) {
    simulateTimeElapsed(frames * TYPICAL_FRAME_DURATION, game);
  }
};

export const simulateFramesToMoveNTiles = (
  numberOfTiles: number,
  game: Game
) => {
  const numberOfFrames = numberOfTiles * framesPerTile(game);
  simulateFrames(numberOfFrames, game);
};
