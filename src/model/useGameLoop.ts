import { useStore } from '../components/StoreContext';
import { onAnimationFrame } from './onAnimationFrame';
import { useAnimationLoop } from './useAnimationLoop';

export const useGameLoop = () => {
  const store = useStore();

  const animationStep = (timestamp: number) => {
    const { game } = store;
    onAnimationFrame({ game, timestamp });
  };

  useAnimationLoop(animationStep);
};
