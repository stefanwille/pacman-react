import { useEffect, useRef } from 'react';
import { MilliSeconds } from './Types';

type AnimationStepFunc = (timestamp: MilliSeconds) => void;

export const useAnimationLoop = (animationStep: AnimationStepFunc) => {
  const requestRef = useRef(-1);

  const animate = (timestamp: number) => {
    animationStep(timestamp);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, []);
};
