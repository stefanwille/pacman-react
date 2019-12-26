import MapData from "../mapData/pacman6.json";
import { Coordinates } from "./Coordinates";

const BASIC_PILL_ID = 3533;
const ENERGIZER_ID = 3589;

const getLayer = (layerName: string) => {
  const layer = MapData.layers.find(layer => layer.name === layerName);
  if (!layer) {
    throw new Error(`${layerName} layer not found`);
  }
  return layer;
};

const pillsLayer = getLayer("Pills");
const waysLayer = getLayer("Ways");

export const mazeWidthInTiles = pillsLayer.width;
export const mazeHeightInTiles = pillsLayer.height;

export const getTileMatrix = (data: number[]): number[][] => {
  const tileMatrix: number[][] = Array(mazeHeightInTiles);
  let dataIndex = 0;
  for (let ty = 0; ty < mazeHeightInTiles; ty++) {
    tileMatrix[ty] = Array(mazeWidthInTiles);
    for (let tx = 0; tx < mazeWidthInTiles; tx++) {
      const tileId = data[dataIndex];
      tileMatrix[ty][tx] = tileId;
      dataIndex++;
    }
  }
  return tileMatrix;
};

export const pillsMatrix = getTileMatrix(pillsLayer.data);
export const waysMatrix = getTileMatrix(waysLayer.data);
