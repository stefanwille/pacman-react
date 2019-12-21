import React, { FC } from "react";
import { Sprite } from "./Sprite";
import { Direction } from "./Types";

export type PacManPhase = 0 | 1;

export const PacManPhases: PacManPhase[] = [0, 1];

type PacManProps = {
  direction: Direction;
  phase: PacManPhase;
  x: number;
  y: number;
};

export const PacMan: FC<PacManProps> = ({ direction, phase, x, y }) => {
  return (
    <Sprite
      className="Sprite-pacman"
      name={`pacman-direction-${direction}-phase-${phase}`}
      x={x}
      y={y}
    />
  );
};
