import React from "react";
import { Sprite } from "../../components/Sprite";
import { GridWithHoverCoordinates } from "../../components/Grid";

import MapData from "../../mapData/pacman6.json";
import { PacMan } from "../../components/PacMac";

type Coordinates = [number, number];

const PILL_ID = 3533;
const ENERGIZER_ID = 3589;

const getPills = (): { pills: Coordinates[]; energizers: Coordinates[] } => {
  const layer = MapData.layers.find(layer => layer.name === "Pills");
  if (!layer) {
    throw new Error("Pills layer not found");
  }
  const pills: Coordinates[] = [];
  const energizers: Coordinates[] = [];
  layer.data.forEach((tileId: number, cellIndex: number) => {
    if (tileId === 0) {
      return;
    }
    const columnIndex = cellIndex % layer.width;
    const rowIndex = Math.floor(cellIndex / layer.width);
    const coordinates: Coordinates = [columnIndex, rowIndex];
    if (tileId === PILL_ID) {
      pills.push(coordinates);
    } else if (tileId === ENERGIZER_ID) {
      energizers.push(coordinates);
    } else {
      throw new Error(tileId.toString());
    }
  });
  return { pills, energizers };
};

export const MazeTestPage: React.FC = () => {
  const pills = getPills();
  console.log("getPills", pills, pills.pills.length);

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
      <Sprite x={8 * 3 * 6} y={8 * 3 * 10} name="energizer"></Sprite>

      <PacMan
        direction="RIGHT"
        phase={2}
        x={8 * 3 * 0 + 4 * 3}
        y={8 * 3 * 7 + 12}
        style={{ backgroundColor: "red" }}
      />
    </div>
  );
};
