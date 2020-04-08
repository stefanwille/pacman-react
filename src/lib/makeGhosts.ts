import { Game } from './Game';
import { Ghost } from './Ghost';

export const resetGhosts = (ghosts: Ghost[]) => {
  ghosts[0].setTileCoordinates({ x: 12, y: 14 });
  ghosts[0].direction = 'LEFT';
  ghosts[1].setTileCoordinates({ x: 13, y: 14 });
  ghosts[1].direction = 'RIGHT';
  ghosts[2].setTileCoordinates({ x: 14, y: 14 });
  ghosts[3].direction = 'LEFT';
  ghosts[3].setTileCoordinates({ x: 15, y: 14 });
  ghosts[3].direction = 'RIGHT';

  for (const ghost of ghosts) {
    ghost.resetGhost();
  }
};

export const makeGhosts = (game: Game): Ghost[] => {
  const ghosts: Ghost[] = [
    new Ghost(game),
    new Ghost(game),
    new Ghost(game),
    new Ghost(game),
  ];

  ghosts[0].ghostNumber = 0;
  ghosts[0].name = 'Blinky';
  ghosts[0].color = 'red';
  ghosts[0].colorCode = '#ff0000';
  ghosts[0].initialWaitingTimeInBox = 1000;

  ghosts[1].ghostNumber = 1;
  ghosts[1].name = 'Pinky';
  ghosts[1].color = 'pink';
  ghosts[1].colorCode = '#fcb5ff';
  ghosts[1].initialWaitingTimeInBox = 1300;

  ghosts[2].ghostNumber = 2;
  ghosts[2].name = 'Inky';
  ghosts[2].color = 'blue';
  ghosts[2].colorCode = '#00ffff';
  ghosts[2].initialWaitingTimeInBox = 1600;

  ghosts[3].ghostNumber = 3;
  ghosts[3].name = 'Clyde';
  ghosts[3].color = 'orange';
  ghosts[3].colorCode = '#f9ba55';
  ghosts[3].initialWaitingTimeInBox = 1900;

  resetGhosts(ghosts);

  return ghosts;
};
