import MapData from "../mapData/pacman6.json";
import { Coordinates } from "./Coordinates";

const BASIC_PILL_ID = 3533;
const ENERGIZER_ID = 3589;

const getPillsLayer = () => {
  const layer = MapData.layers.find(layer => layer.name === "Pills");
  if (!layer) {
    throw new Error("Pills layer not found");
  }
  return layer;
};

const pillsLayer = getPillsLayer();

export const mazeWidthInTiles = pillsLayer.width;
export const mazeHeightInTiles = pillsLayer.height;

export const getPillsMatrix = (): number[][] => {
  const pillsMatrix: number[][] = Array(mazeHeightInTiles);
  let dataIndex = 0;
  for (let ty = 0; ty < mazeHeightInTiles; ty++) {
    pillsMatrix[ty] = Array(mazeWidthInTiles);
    for (let tx = 0; tx < mazeWidthInTiles; tx++) {
      const tileId = pillsLayer.data[dataIndex];
      dataIndex++;
      // if (tileId === 0) {
      //   continue;
      // }
      // if (tileId === BASIC_PILL_ID) {
      //   pillsMatrix[ty][tx] = tileId;
      // } else if (tileId === ENERGIZER_ID) {
      //   energizers.push(coordinates);
      // } else {
      //   throw new Error(tileId.toString());
      // }
      pillsMatrix[ty][tx] = tileId;
    }
  }
  return pillsMatrix;
};

export const pillsMatrix = getPillsMatrix();

export const getPills = (): {
  pills: Coordinates[];
  energizers: Coordinates[];
} => {
  const pills: Coordinates[] = [];
  const energizers: Coordinates[] = [];
  pillsLayer.data.forEach((tileId: number, cellIndex: number) => {
    if (tileId === 0) {
      return;
    }
    const tx = cellIndex % pillsLayer.width;
    const ty = Math.floor(cellIndex / pillsLayer.width);
    const coordinates: Coordinates = [tx, ty];
    if (tileId === BASIC_PILL_ID) {
      pills.push(coordinates);
    } else if (tileId === ENERGIZER_ID) {
      energizers.push(coordinates);
    } else {
      throw new Error(tileId.toString());
    }
  });
  return { pills, energizers };
};
