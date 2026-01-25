import { useGameStore } from './store';
import { onAnimationFrame, TYPICAL_FRAME_LENGTH } from './onAnimationFrame';
import { MilliSeconds } from './Types';
import { SCREEN_TILE_SIZE } from './Coordinates';

const framesPerTile = () => {
  const speed = useGameStore.getState().game.speed;
  return SCREEN_TILE_SIZE / speed;
};

export const simulateFrame = (frameLength: MilliSeconds = TYPICAL_FRAME_LENGTH) => {
  const previousTimestamp = useGameStore.getState().game.externalTimeStamp ?? 0;
  const timestamp = previousTimestamp + frameLength;
  onAnimationFrame(timestamp);
};

export const simulateFrames = (numberOfFrames: number) => {
  for (let frames = 0; frames < numberOfFrames; frames++) {
    simulateFrame();
  }
};

export const simulateFramesToMoveNTiles = (numberOfTiles: number) => {
  const numberOfFrames = numberOfTiles * framesPerTile();
  simulateFrames(numberOfFrames);
};

export const simulateTime = (timeToPass: MilliSeconds) => {
  const numberOfFrames = Math.floor(timeToPass / TYPICAL_FRAME_LENGTH);
  simulateFrames(numberOfFrames);
  const passedTime = numberOfFrames * TYPICAL_FRAME_LENGTH;
  const timeLeft = timeToPass - passedTime;
  if (timeLeft > 0) {
    simulateFrame(timeLeft);
  }
};
