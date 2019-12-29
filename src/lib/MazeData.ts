import MapData from "../mapData/pacman6.json";

export type TileId = number;

export const BASIC_PILL_ID: TileId = 3533;
export const ENERGIZER_ID: TileId = 3589;

export const WAY_FREE_ID: TileId = 5240;

interface Layer {
  data: number[];
  width: number;
  height: number;
}

const getLayer = (layerName: string): Layer => {
  const layer = MapData.layers.find(layer => layer.name === layerName);
  if (!layer) {
    throw new Error(`${layerName} layer not found`);
  }
  return layer;
};

const pillsLayer: Layer = getLayer("Pills");
const waysLayer: Layer = getLayer("Ways");

export const mazeWidthInTiles = pillsLayer.width;
export const mazeHeightInTiles = pillsLayer.height;

export const getTileMatrix = (data: TileId[]): TileId[][] => {
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
