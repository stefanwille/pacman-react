import React from "react";
import { Sprite } from "../../components/Sprite";
import { GridWithHoverCoordinates } from "../../components/Grid";

export const MazeTestPage: React.FC = () => {
  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <Sprite className="Sprite-maze" name="maze-state-empty" x={0} y={0} />

      <GridWithHoverCoordinates x={0} y={0} />

      <Sprite
        className="Sprite-maze"
        name="maze-state-full"
        x={16 * 16 * 3}
        y={0}
      />

      <GridWithHoverCoordinates x={16 * 16 * 3} y={0} />

      <Sprite x={8 * 3 * 1} y={8 * 3 * 1} name="pill"></Sprite>
      <Sprite x={8 * 3 * 1} y={8 * 3 * 3} name="energizer"></Sprite>
    </div>
  );
};
