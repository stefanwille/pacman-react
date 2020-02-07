import { Coordinates } from './Coordinates';
import { GameStore } from './GameStore';

export const getGhostDestination = ({
  ghostNumber,
  store,
}: {
  ghostNumber: number;
  store: GameStore;
}): Coordinates => {
  return store.pacMan.tileCoordinates;
};
