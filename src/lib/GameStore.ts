import { configure, observable, action, computed } from 'mobx';

import { PacMan } from './PacMan';
import { Ghost } from './Ghost';
import { TileId, getPillsMatrix } from './MazeData';
import { GameInterface } from './GameInterface';
import { screenFromTile } from './Coordinates';

configure({ enforceActions: 'observed' });

const makeGhosts = (game: GameInterface): Ghost[] => {
  const ghosts: Ghost[] = [
    new Ghost(game),
    new Ghost(game),
    new Ghost(game),
    new Ghost(game),
  ];

  ghosts[0].ghostNumber = 0;
  ghosts[0].color = 'red';
  [ghosts[0].x, ghosts[0].y] = screenFromTile(12, 11);

  ghosts[1].ghostNumber = 1;
  ghosts[1].color = 'pink';
  [ghosts[1].x, ghosts[1].y] = screenFromTile(13, 11);

  ghosts[2].ghostNumber = 2;
  ghosts[2].color = 'cyan';
  [ghosts[2].x, ghosts[2].y] = screenFromTile(14, 11);

  ghosts[3].ghostNumber = 3;
  ghosts[3].color = 'orange';
  [ghosts[3].x, ghosts[3].y] = screenFromTile(15, 11);
  return ghosts;
};

export class GameStore implements GameInterface {
  constructor() {
    this.ghosts = makeGhosts(this);
  }

  @observable
  timestamp = 0;

  @observable
  previousTimestamp = 0;

  @computed
  get timeBetweenTicks() {
    return this.timestamp - this.previousTimestamp;
  }

  @observable
  gamePaused = false;

  @action.bound
  toggleGamePaused() {
    this.gamePaused = !this.gamePaused;
  }

  // TODO: gameRunning vs. gamePaused
  @observable
  gameRunning = true;

  ghosts: Ghost[];

  pacMan = new PacMan();

  @observable
  score = 0;

  @observable
  pills: TileId[][] = getPillsMatrix();

  @action.bound
  setPressedKey(pressedKey: string) {
    this.pacMan.setPressedKey(pressedKey);
  }

  @action.bound
  stopGame() {
    this.gameRunning = false;
  }

  @action.bound
  killPacMan() {
    this.pacMan.setState('dead');
    this.pacMan.diedAtTimestamp = this.timestamp;
  }

  @action.bound
  revivePacMan() {
    this.pacMan.setState('eating');
  }
}
