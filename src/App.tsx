/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useEffect, useState, Fragment } from "react";
import "./App.css";

type Direction = "UP" | "DOWN" | "RIGHT" | "LEFT";
type PacManPhase = 0 | 1;
type GhostNumber = 0 | 1 | 2 | 3;

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
        transform: `translate(${x}px, ${y}px) scale(2)`
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

const GHOST_DX = {
  RIGHT: 0,
  LEFT: 32,
  UP: 64,
  DOWN: 48
};

const Ghost: FC<GhostProps> = ({ direction, phase, x, y, ghostNumber }) => {
  const dx: string = `-${457 + GHOST_DX[direction] + phase * 16}px`;
  const dy = `-${65 + ghostNumber * 16}px`;
  return (
    <div
      className="Sprite"
      style={{
        backgroundPosition: `${dx} ${dy}`,
        transform: `translate(${x}px, ${y}px) scale(2)`
      }}
    />
  );
};

const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];

const App: React.FC = () => {
  const [phase, setPhase] = useState<PacManPhase>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setPhase((phase: PacManPhase) => (phase === 0 ? 1 : 0));
    }, 300);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <div className="Maze">
        <PacMan direction="LEFT" phase={phase} x={30} y={100} />

        <PacMan direction="LEFT" phase={0} x={100} y={100} />
        <PacMan direction="LEFT" phase={1} x={100} y={140} />
        <PacMan direction="UP" phase={0} x={100} y={220} />
        <PacMan direction="UP" phase={1} x={100} y={260} />
        <PacMan direction="DOWN" phase={0} x={100} y={340} />
        <PacMan direction="DOWN" phase={1} x={100} y={380} />
        <PacMan direction="RIGHT" phase={0} x={100} y={460} />
        <PacMan direction="RIGHT" phase={1} x={100} y={500} />

        {GhostNumbers.map((ghostNumber: GhostNumber) => (
          <Fragment key={ghostNumber}>
            <Ghost
              direction="LEFT"
              phase={0}
              x={160 + ghostNumber * 40}
              y={100}
              ghostNumber={ghostNumber}
            />
            <Ghost
              direction="LEFT"
              phase={1}
              x={160 + ghostNumber * 40}
              y={140}
              ghostNumber={ghostNumber}
            />
            <Ghost
              direction="UP"
              phase={0}
              x={160 + ghostNumber * 40}
              y={220}
              ghostNumber={ghostNumber}
            />
            <Ghost
              direction="UP"
              phase={1}
              x={160 + ghostNumber * 40}
              y={260}
              ghostNumber={ghostNumber}
            />
            <Ghost
              direction="DOWN"
              phase={0}
              x={160 + ghostNumber * 40}
              y={340}
              ghostNumber={ghostNumber}
            />
            <Ghost
              direction="DOWN"
              phase={1}
              x={160 + ghostNumber * 40}
              y={380}
              ghostNumber={ghostNumber}
            />
            <Ghost
              direction="RIGHT"
              phase={0}
              x={160 + ghostNumber * 40}
              y={460}
              ghostNumber={ghostNumber}
            />
            <Ghost
              direction="RIGHT"
              phase={1}
              x={160 + ghostNumber * 40}
              y={500}
              ghostNumber={ghostNumber}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default App;
