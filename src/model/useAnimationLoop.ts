import { useEffect, useState } from 'react';

type AnimationStepFunc = (timestamp: number) => void;

export const useAnimationLoop = (animationStep: AnimationStepFunc) => {
  const [running, setRunning] = useState(true);

  const animationFrame = (timestamp: number) => {
    animationStep(timestamp);
    if (running) {
      window.requestAnimationFrame(animationFrame);
    }
  };

  const stopAnimationLoop = () => {
    setRunning(false);
  };

  useEffect(() => {
    window.requestAnimationFrame(animationFrame);
    return stopAnimationLoop;
    /* eslint-disable  react-hooks/exhaustive-deps */
  }, []);
};
