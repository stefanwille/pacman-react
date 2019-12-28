import { GameStore } from "./Store";
import { onTimeElapsed } from "./onTimeElapsed";
import { useEffect } from "react";

export const useGameLoop = (store: GameStore) => {
  const animationStep = (timestamp: number) => {
    onTimeElapsed({ store, timestamp });
    if (store.gameRunning) {
      window.requestAnimationFrame(animationStep);
    }
  };

  useEffect(() => {
    window.requestAnimationFrame(animationStep);
    return store.stopGame;
  }, []);
};
