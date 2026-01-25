import { useGameStore } from './store';
import { detectCollisions } from './detectCollisions';
import { updateGhosts } from './updateGhosts';
import { updatePacMan } from './updatePacMan';
import { updateEnergizerTimer } from './updateEnergizerTimer';

// The typical duration of a frame: 1000ms for 60 frames per second = 17ms.
export const TYPICAL_FRAME_LENGTH = 17;

export const onAnimationFrame = (externalTimeStamp: number) => {
  const store = useGameStore.getState();
  const game = store.game;

  // Update timing
  let lastFrameLength: number;
  if (game.externalTimeStamp === null) {
    lastFrameLength = TYPICAL_FRAME_LENGTH;
  } else {
    lastFrameLength = externalTimeStamp - game.externalTimeStamp;
  }

  // Batch all timing updates
  useGameStore.setState((state) => {
    state.game.externalTimeStamp = externalTimeStamp;
    state.game.lastFrameLength = lastFrameLength;
  });

  if (game.gamePaused) {
    return;
  }

  // Update game timestamp
  useGameStore.setState((state) => {
    state.game.timestamp += state.game.lastFrameLength;
    state.game.frameCount++;
  });

  // Update timers and game entities
  updateEnergizerTimer();
  updatePacMan();
  updateGhosts();
  detectCollisions();
};
