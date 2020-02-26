import { action, computed, configure, observable } from 'mobx';
import { Ghost } from './Ghost';
import { makeGhosts } from './makeGhosts';
import { Maze } from './Maze';
import { PacMan } from './PacMan';
import { MilliSeconds } from './Types';

configure({ enforceActions: 'observed' });

export class Game {
  constructor() {
    this.pacMan = new PacMan(this);
    this.ghosts = makeGhosts(this);
  }

  @observable
  timestamp: MilliSeconds = 0;

  @observable
  previousTimestamp: MilliSeconds = 0;

  @computed
  get timeSinceLastFrame(): MilliSeconds {
    return this.timestamp - this.previousTimestamp;
  }

  @observable
  gamePaused = false;

  @action.bound
  toggleGamePaused() {
    this.gamePaused = !this.gamePaused;
  }

  ghosts: Ghost[];

  pacMan: PacMan;

  @observable
  score = 0;

  maze = new Maze();

  @action.bound
  setPressedKey(pressedKey: string) {
    this.pacMan.setPressedKey(pressedKey);
  }

  @action.bound
  stopGame() {
    this.gamePaused = true;
  }

  @action.bound
  revivePacMan() {
    this.pacMan.send('REVIVED');
    this.pacMan.diedAtTimestamp = 0;

    for (const ghost of this.ghosts) {
      ghost.ghostPaused = false;
    }
  }
}
