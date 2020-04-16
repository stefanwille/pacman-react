import { useEffect, useRef } from 'react';

type AnimationStepFunc = (timestamp: number) => void;

export const useAnimationLoop = (animationStep: AnimationStepFunc) => {
  const requestRef = useRef<any>();

  const animate = (timestamp: number) => {
    animationStep(timestamp);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
};
