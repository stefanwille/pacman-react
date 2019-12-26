import MapData from "../mapData/pacman6.json";

const PILL_ID = 3533;
const ENERGIZER_ID = 3589;

const getPillsLayer = () => {
  const layer = MapData.layers.find(layer => layer.name === "Pills");
  if (!layer) {
    throw new Error("Pills layer not found");
  }
  return layer;
};

export const getWidthInTiles = () => getPillsLayer().width;
export const getHeightInTiles = () => getPillsLayer().height;

export const getPills = (): {
  pills: Coordinates[];
  energizers: Coordinates[];
} => {
  const pills: Coordinates[] = [];
  const energizers: Coordinates[] = [];
  const layer = getPillsLayer();
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

export class MazeStore {}
