import React, { FC } from "react";
import { Sprite } from "./Sprite";
import { Direction } from "./Types";

export type PacManPhase = 0 | 1 | 2;

export const PacManPhases: PacManPhase[] = [0, 1, 2];

type PacManProps = {
  direction: Direction;
  phase: PacManPhase;
  x: number;
  y: number;
  style?: { [key: string]: any };
};

export const PacMan: FC<PacManProps> = ({ direction, phase, x, y, style }) => {
  return (
    <Sprite
      className="Sprite-pacman"
      name={`pacman-direction-${direction}-phase-${phase}`}
      x={x}
      y={y}
      style={style}
    />
  );
};
