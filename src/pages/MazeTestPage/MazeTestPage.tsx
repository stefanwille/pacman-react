import React from "react";
import { Sprite } from "../../components/Sprite";
import { Grid } from "../../components/Grid";

export const MazeTestPage: React.FC = () => {
  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <Sprite className="Sprite-maze" name="maze-state-empty" x={0} y={0} />

      <Grid x={0} y={0} />

      <Sprite
        className="Sprite-maze"
        name="maze-state-full"
        x={16 * 16 * 3}
        y={0}
      />

      <Grid x={16 * 16 * 3} y={0} />
    </div>
  );
};
