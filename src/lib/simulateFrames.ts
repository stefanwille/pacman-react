import { TILE_SIZE } from './Coordinates';
import { Game } from './Game';
import { onTimeElapsed } from './onTimeElapsed';
import { SPEED } from './Types';

const MILLISECONDS_PER_FRAME = 17;

const FRAMES_PER_TILE = TILE_SIZE / SPEED;

export const simulateFrames = (numberOfFrames: number, game: Game) => {
  for (let frames = 0; frames < numberOfFrames; frames++) {
    onTimeElapsed({
      game,
      timestamp: 1 + frames * MILLISECONDS_PER_FRAME,
    });
  }
};

export const simulateFramesToMoveNTiles = (
  numberOfTiles: number,
  game: Game
) => {
  const numberOfFrames = numberOfTiles * FRAMES_PER_TILE;
  simulateFrames(numberOfFrames, game);
};
