import { useStore } from '../components/StoreContext';
import { onTimeElapsed } from './onTimeElapsed';
import { useAnimationLoop } from './useAnimationLoop';

export const useGameLoop = () => {
  const store = useStore();
  const { game } = store;

  const animationStep = (timestamp: number) => {
    onTimeElapsed({ game, timestamp });
  };

  useAnimationLoop(animationStep);
};
