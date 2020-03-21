import { onTimeElapsed } from './onTimeElapsed';
import { useEffect } from 'react';
import { Store } from './Store';

export const useGameLoop = (store: Store) => {
  const animationStep = (timestamp: number) => {
    onTimeElapsed({ game: store.game, timestamp });
    if (store.game.animationLoopRunning) {
      window.requestAnimationFrame(animationStep);
    }
  };

  useEffect(() => {
    window.requestAnimationFrame(animationStep);
    return store.game.stopAnimationLoop;
    /* eslint-disable  react-hooks/exhaustive-deps */
  }, []);
};
