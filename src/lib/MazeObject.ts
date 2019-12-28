import { screenCoordinatesFromTileCoordinates } from "./Coordinates";

export interface MazeObject {
  x: number;
  y: number;
}

export const setTileCoordinates = ({
  store,
  tx,
  ty
}: {
  store: MazeObject;
  tx: number;
  ty: number;
}) => {
  const [sx, sy] = screenCoordinatesFromTileCoordinates(tx, ty);
  store.x = sx;
  store.y = sy;
};
