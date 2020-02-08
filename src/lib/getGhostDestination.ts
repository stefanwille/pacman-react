import { GameStore } from './GameStore';
import { TileCoordinates } from './Coordinates';

export const getGhostDestination = ({
  ghostNumber,
  store,
}: {
  ghostNumber: number;
  store: GameStore;
}): TileCoordinates => {
  return store.pacMan.tileCoordinates;
};
