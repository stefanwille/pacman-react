import { onAnimationFrame } from './onAnimationFrame';
import { useAnimationLoop } from './useAnimationLoop';

export const useGameLoop = () => {
  const animationStep = (timestamp: number) => {
    onAnimationFrame(timestamp);
  };

  useAnimationLoop(animationStep);
};
