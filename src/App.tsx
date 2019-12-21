import React, { FC, useEffect, useState, Fragment } from "react";
import classNames from "classnames";
import "./App.css";

const Sprite: FC<{
  name: string;
  x: number;
  y: number;
  className?: string | null;
}> = ({ name: spriteName, x, y, className = null }) => {
  return (
    <div
      className={classNames("Sprite", "Sprite-" + spriteName, className)}
      style={{
        transform: `translate(${x}px, ${y}px) scale(4)`
      }}
    />
  );
};

type Direction = "UP" | "DOWN" | "RIGHT" | "LEFT";
type PacManPhase = 0 | 1;
type GhostNumber = 0 | 1 | 2 | 3;
type GhostPhase = 0 | 1;

const PacManPhases: PacManPhase[] = [0, 1];
const DY = {
  LEFT: "0px",
  RIGHT: "-16px",
  UP: "-32px",
  DOWN: "-48px"
};

type PacManProps = {
  direction: Direction;
  phase: PacManPhase;
  x: number;
  y: number;
};

const PacMan: FC<PacManProps> = ({ direction, phase, x, y }) => {
  return (
    <Sprite name={`pacman-direction-${direction}-phase-${phase}`} x={x} y={y} />
  );
};

type GhostProps = {
  direction: Direction;
  phase: PacManPhase;
  x: number;
  y: number;
  ghostNumber: number;
};

const Ghost: FC<GhostProps> = ({ direction, phase, x, y, ghostNumber }) => (
  <Sprite
    name={`ghost-${ghostNumber}-direction-${direction}-phase-${phase}`}
    x={x}
    y={y}
  />
);

const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];
const Directions: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
const GhostPhases: GhostPhase[] = [0, 1];

const App: React.FC = () => {
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
    <div className="App">
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
    </div>
  );
};

export default App;
