import { action, computed, configure, observable } from 'mobx';
import { Ghost } from './Ghost';
import { makeGhosts } from './makeGhosts';
import { Maze } from './Maze';
import { PacMan } from './PacMan';

configure({ enforceActions: 'observed' });

export class Game {
  constructor() {
    this.pacMan = new PacMan(this);
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
  killPacMan() {
    this.pacMan.setState('dead');
    this.pacMan.diedAtTimestamp = this.timestamp;
  }

  @action.bound
  revivePacMan() {
    this.pacMan.setState('eating');
  }

  @observable
  phaseTimerTimeLeft: number = 5 * 1000;
}
