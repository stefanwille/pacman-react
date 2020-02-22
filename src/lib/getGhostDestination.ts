import { Game } from './Game';
import { TileCoordinates } from './Coordinates';

export const getGhostDestination = ({
  ghostNumber,
  store,
}: {
  ghostNumber: number;
  store: Game;
}): TileCoordinates => {
  return store.pacMan.tileCoordinates;
};
