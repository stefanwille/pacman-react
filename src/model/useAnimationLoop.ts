import { useEffect, useRef } from 'react';
import { MilliSeconds } from './Types';

type AnimationStepFunc = (currentTime: MilliSeconds) => void;

// 60 animation steps per second
const TICK_DURATION = 1000 / 60;


export const useAnimationLoop = (animationStep: AnimationStepFunc) => {
  // The requestAnimationFrame call id
  const requestRef = useRef(-1);
  // The last time the animation step was called
  const lastTimeRef = useRef(performance.now());
  // The accumulated time since the last update
  const accumulatorRef = useRef(0);

  const animate = (currentTime: number) => {
    accumulatorRef.current += currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Ensure a consistent, fixed number of animation steps per second:
    //   If we get less than 60 animation frames per second, the while loop may perform multiple animation steps in a single frame.
    //   If we get more than 60 animation frames per second, the while loop may skip some updates. This happens with Apple's 120Hz ProMotion display, such as the MacBook Pro Apple Silicon.
    while (accumulatorRef.current >= TICK_DURATION) {
      animationStep(currentTime);
      accumulatorRef.current -= TICK_DURATION;
    }

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
