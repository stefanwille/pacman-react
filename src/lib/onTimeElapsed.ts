import { action } from 'mobx';
import { GameStore } from './GameStore';
import { updateGhost } from './updateGhost';
import { updateGhostPhase } from './updateGhostPhase';
import { updatePacMan } from './updatePacMan';
import { detectCollisions } from './detectCollisions';

export const onTimeElapsed = action(
  'onTimeElapsed',
  ({ store, timestamp }: { store: GameStore; timestamp: number }) => {
    store.previousTimestamp = store.timestamp;
    store.timestamp = timestamp;
    if (store.gamePaused) {
      return;
    }

    updatePacMan({ pacMan: store.pacMan, timestamp });
    for (const ghost of store.ghosts) {
      updateGhost({ ghost: ghost, timestamp });
    }

    detectCollisions({ store });

    updateGhostPhase({ store });
  }
);
