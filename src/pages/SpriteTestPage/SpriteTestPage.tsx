import React, { useEffect, useState } from "react";
import { PacManPhase, PacManPhases, PacMan } from "../../components/PacMac";
import {
  GhostNumber,
  GhostNumbers,
  GhostPhases,
  GhostPhase,
  Ghost
} from "../../components/Ghost";
import { Directions, Direction } from "../../components/Types";

export const SpriteTestPage: React.FC = () => {
  const [phase, setPhase] = useState<PacManPhase>(0);
  const [directionIndex, setDirectionIndex] = useState<number>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setPhase((phase: PacManPhase) => (phase === 0 ? 1 : 0));
    }, 300);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setDirectionIndex((directionIndex: number) =>
        directionIndex === 3 ? 0 : directionIndex + 1
      );
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const direction = Directions[directionIndex];
  return (
    <div className="Maze">
      {GhostNumbers.map((ghostNumber: GhostNumber) =>
        Directions.map((direction: Direction, directionIndex: number) =>
          GhostPhases.map((ghostPhase: GhostPhase) => (
            <Ghost
              key={ghostPhase}
              direction={direction}
              phase={ghostPhase}
              x={30 + directionIndex * 160 + ghostPhase * 80}
              y={0 + ghostNumber * 60}
              ghostNumber={ghostNumber}
            />
          ))
        )
      )}

      {Directions.map((direction: Direction, directionIndex: number) =>
        PacManPhases.map((pacManPhase: PacManPhase) => (
          <PacMan
            key={pacManPhase}
            direction={direction}
            phase={pacManPhase}
            x={30 + directionIndex * 160 + pacManPhase * 80}
            y={270}
          />
        ))
      )}

      <PacMan direction={direction} phase={phase} x={30} y={400} />

      {GhostNumbers.map(ghostNumber => (
        <Ghost
          key={ghostNumber}
          direction={direction}
          phase={phase}
          x={30 + ghostNumber * 80}
          y={480}
          ghostNumber={ghostNumber}
        />
      ))}
    </div>
  );
};
