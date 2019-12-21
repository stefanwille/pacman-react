/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useEffect, useState, useMemo } from "react";
import "./App.css";

type Direction = "UP" | "DOWN" | "RIGHT" | "LEFT";
type PacManPhase = 0 | 1;

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
      className="PacMan"
      style={{
        backgroundPosition: `${dx} ${dy}`,
        transform: `translate(${x}px, ${y}px) scale(2)`
      }}
    />
  );
};

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
      </div>
    </div>
  );
};

export default App;
