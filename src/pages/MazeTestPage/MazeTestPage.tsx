import React from "react";
import { Sprite } from "../../components/Sprite";

export const MazeTestPage: React.FC = () => {
  return (
    <div>
      <Sprite className="Sprite-maze" name="maze-state-full" x={0} y={0} />;
      <Sprite
        className="Sprite-maze"
        name="maze-state-empty"
        x={0}
        y={250 * 4}
      />
      ;
    </div>
  );
};
