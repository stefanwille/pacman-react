import { useStore } from '../pages/GamePage/components/StoreContext';
import { onTimeElapsed } from './onTimeElapsed';
import { useAnimationLoop } from './useAnimationLoop';

export const useGameLoop = () => {
  console.log('useGameLoop', new Date());

  const store = useStore();

  const animationStep = (timestamp: number) => {
    const { game } = store;
    onTimeElapsed({ game, timestamp });
  };

  useAnimationLoop(animationStep);
};
