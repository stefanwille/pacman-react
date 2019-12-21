/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from "react";
import "./App.css";

type Direction = "UP" | "DOWN" | "RIGHT" | "LEFT";
type PacManPhase = 0 | 1 | 2;

const DY = {
  LEFT: "0px",
  RIGHT: "-16px",
  UP: "-32px",
  DOWN: "-48px"
};

const PacMan: FC<{
  direction: Direction;
  phase: PacManPhase;
  x: number;
  y: number;
}> = ({ direction, phase, x, y }) => {
  const dx = `-${phase * 16}px`;
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
  return (
    <div className="App">
      <div className="Maze">
        <PacMan direction="LEFT" phase={0} x={0} y={0} />
        <PacMan direction="LEFT" phase={1} x={100} y={140} />
        <PacMan direction="LEFT" phase={2} x={100} y={180} />
        <PacMan direction="UP" phase={0} x={100} y={220} />
        <PacMan direction="UP" phase={1} x={100} y={260} />
        <PacMan direction="UP" phase={2} x={100} y={300} />
        <PacMan direction="DOWN" phase={0} x={100} y={340} />
        <PacMan direction="DOWN" phase={1} x={100} y={380} />
        <PacMan direction="DOWN" phase={2} x={100} y={420} />
        <PacMan direction="RIGHT" phase={0} x={100} y={460} />
        <PacMan direction="RIGHT" phase={1} x={100} y={500} />
        <PacMan direction="RIGHT" phase={2} x={100} y={540} />
      </div>
    </div>
  );
};

export default App;
