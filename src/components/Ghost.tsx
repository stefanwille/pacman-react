import React, { FC } from "react";
import { Direction } from "./Types";
import { Sprite } from "./Sprite";

export type GhostNumber = 0 | 1 | 2 | 3;
export type GhostPhase = 0 | 1;

type GhostProps = {
  direction: Direction;
  phase: GhostPhase;
  x: number;
  y: number;
  ghostNumber: number;
  style?: { [key: string]: any };
};

export const Ghost: FC<GhostProps> = ({
  direction,
  phase,
  x,
  y,
  ghostNumber,
  style
}) => (
  <Sprite
    className="Sprite-ghost"
    name={`ghost-${ghostNumber}-direction-${direction}-phase-${phase}`}
    x={x}
    y={y}
    style={style}
  />
);

export const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];
export const GhostPhases: GhostPhase[] = [0, 1];
