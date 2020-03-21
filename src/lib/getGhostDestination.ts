import { Game } from './Game';
import { TileCoordinates } from './Coordinates';

export const getGhostDestination = ({
  ghostNumber,
  game,
}: {
  ghostNumber: number;
  game: Game;
}): TileCoordinates => {
  return game.pacMan.tileCoordinates;
};
