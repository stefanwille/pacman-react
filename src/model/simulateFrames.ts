import { Game } from './Game';
import { onAnimationFrame } from './onAnimationFrame';
import { MilliSeconds } from './Types';
import { SCREEN_TILE_SIZE } from './Coordinates';
import { TYPICAL_FRAME_LENGTH } from './updateExternalTimeStamp';

const framesPerTile = (game: Game) => SCREEN_TILE_SIZE / game.speed;

export const simulateFrame = (
  game: Game,
  frameLength: MilliSeconds = TYPICAL_FRAME_LENGTH
) => {
  const previousTimestamp = game.externalTimeStamp ?? 0;
  const timestamp = previousTimestamp + frameLength;
  onAnimationFrame({
    game,
    timestamp,
  });
};

export const simulateFrames = (numberOfFrames: number, game: Game) => {
  for (let frames = 0; frames < numberOfFrames; frames++) {
    simulateFrame(game);
  }
};

export const simulateFramesToMoveNTiles = (
  numberOfTiles: number,
  game: Game
) => {
  const numberOfFrames = numberOfTiles * framesPerTile(game);
  simulateFrames(numberOfFrames, game);
};

export const simulateTime = (game: Game, timeToPass: MilliSeconds) => {
  const numberOfFrames = Math.floor(timeToPass / TYPICAL_FRAME_LENGTH);
  simulateFrames(numberOfFrames, game);
  const passedTime = numberOfFrames * TYPICAL_FRAME_LENGTH;
  const timeLeft = timeToPass - passedTime;
  if (timeLeft > 0) {
    simulateFrame(game, timeLeft);
  }
};
