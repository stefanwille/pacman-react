import { Game } from './Game';
import { onTimeElapsed } from './onTimeElapsed';
import { useEffect } from 'react';

export const useGameLoop = (store: Game) => {
  const animationStep = (timestamp: number) => {
    onTimeElapsed({ store, timestamp });
    if (!store.gamePaused) {
      window.requestAnimationFrame(animationStep);
    }
  };

  useEffect(() => {
    window.requestAnimationFrame(animationStep);
    return store.stopGame;
  }, []);
};
