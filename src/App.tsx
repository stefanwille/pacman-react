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
  const dx = `-${456 + phase * 16}px`;
  const dy: string = DY[direction];
  return (
    <div
      className="Sprite"
      style={{
        backgroundPosition: `${dx} ${dy}`,
        transform: `translate(${x}px, ${y}px) scale(4)`
      }}
    />
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
    }, 200);
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
                y={-100 + ghostNumber * 60}
                ghostNumber={ghostNumber}
              />
            ))
          )
        )}
        {/* <PacMan direction={direction} phase={phase} x={30} y={100} />

        <PacMan direction="LEFT" phase={0} x={100} y={100} />
        <PacMan direction="LEFT" phase={1} x={100} y={140} />
        <PacMan direction="UP" phase={0} x={100} y={220} />
        <PacMan direction="UP" phase={1} x={100} y={260} />
        <PacMan direction="DOWN" phase={0} x={100} y={340} />
        <PacMan direction="DOWN" phase={1} x={100} y={380} />
        <PacMan direction="RIGHT" phase={0} x={100} y={460} />
        <PacMan direction="RIGHT" phase={1} x={100} y={500} />

                */}
      </div>
    </div>
  );
};

export default App;
