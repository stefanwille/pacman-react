import { action } from 'mobx';
import { Game } from './Game';
import { updateGhost } from './updateGhost';
import { updateGhostPhase } from './updateGhostPhase';
import { updatePacMan } from './updatePacMan';
import { detectCollisions } from './detectCollisions';

export const onTimeElapsed = action(
  'onTimeElapsed',
  ({ store, timestamp }: { store: Game; timestamp: number }) => {
    store.previousTimestamp = store.timestamp;
    store.timestamp = timestamp;
    if (store.gamePaused) {
      return;
    }

    updatePacMan(store);
    for (const ghost of store.ghosts) {
      updateGhost({ ghost: ghost, timestamp });
    }

    detectCollisions({ store });

    updateGhostPhase({ store });
  }
);
