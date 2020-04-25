import { MilliSeconds } from './Types';
import { PacMan } from './PacMan';

export type PacManDyingPhase = number;
export const PacManDyingPhaseCount = 13;
export const PacManDyingPhases: PacManDyingPhase[] = Array.from(
  Array(PacManDyingPhaseCount).keys()
);
export const PacManDyingPhaseLength: MilliSeconds = 200;
export const TotalPacManDyingAnimationLength: MilliSeconds =
  PacManDyingPhaseLength * PacManDyingPhaseCount;

export const getPacManDyingPhase = (pacMan: PacMan): PacManDyingPhase => {
  let dyingPhase: number = Math.floor(
    pacMan.timeSinceDeath / PacManDyingPhaseLength
  );
  if (dyingPhase >= PacManDyingPhaseCount) {
    dyingPhase = PacManDyingPhaseCount - 1;
  }
  return dyingPhase as PacManDyingPhase;
};
