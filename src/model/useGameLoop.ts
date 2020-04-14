import { useStore } from '../components/StoreContext';
import { onTimeElapsed } from './onTimeElapsed';
import { useAnimationLoop } from './useAnimationLoop';

export const useGameLoop = () => {
  const store = useStore();

  const animationStep = (timestamp: number) => {
    const { game } = store;
    onTimeElapsed({ game, timestamp });
  };

  useAnimationLoop(animationStep);
};
