import { TileCoordinates } from './Coordinates';
import { Game } from './Game';

export const ENERGIZER_POINTS = 30;

export const eatEnergizer = (tile: TileCoordinates, game: Game) => {
  game.score += ENERGIZER_POINTS;
  game.killedGhosts = 0;
  game.pacMan.send('ENERGIZER_EATEN');
  for (const ghost of game.ghosts) {
    ghost.send('ENERGIZER_EATEN');
  }
};
