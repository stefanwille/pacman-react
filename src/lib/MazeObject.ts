import { screenFromTileCoordinates } from "./Coordinates";

export interface MazeObject {
  x: number;
  y: number;
}

export const setTileCoordinates = ({
  store,
  tx,
  ty,
}: {
  store: MazeObject;
  tx: number;
  ty: number;
}) => {
  const [sx, sy] = screenFromTileCoordinates(tx, ty);
  store.x = sx;
  store.y = sy;
};
