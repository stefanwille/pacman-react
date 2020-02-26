import { Game } from './Game';
import { Ghost } from './Ghost';
import { INITIAL_GHOST_STATE } from './GhostStateChart';

export const resetGhosts = (ghosts: Ghost[]) => {
  ghosts[0].setTileCoordinates({ x: 12, y: 11 });
  ghosts[1].setTileCoordinates({ x: 13, y: 11 });
  ghosts[2].setTileCoordinates({ x: 14, y: 11 });
  ghosts[3].setTileCoordinates({ x: 15, y: 11 });

  for (const ghost of ghosts) {
    ghost.ghostPaused = false;
    ghost.stateChart.state.value = INITIAL_GHOST_STATE;
    ghost.phaseTime = 0;
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

  ghosts[1].ghostNumber = 1;
  ghosts[1].name = 'Pinky';
  ghosts[1].color = 'pink';
  ghosts[1].colorCode = '#fcb5ff';

  ghosts[2].ghostNumber = 2;
  ghosts[2].name = 'Inky';
  ghosts[2].color = 'blue';
  ghosts[2].colorCode = '#00ffff';

  ghosts[3].ghostNumber = 3;
  ghosts[3].name = 'Clyde';
  ghosts[3].color = 'orange';
  ghosts[3].colorCode = '#f9ba55';

  resetGhosts(ghosts);
  return ghosts;
};
