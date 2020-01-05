import { configure, observable, action, computed } from 'mobx';

import { PacMan } from './PacMan';
import { Ghost, makeGhosts } from './Ghost';
import { TileId, getPillsMatrix } from './MazeData';

configure({ enforceActions: 'observed' });

export class GameStore {
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

  @observable
  gameRunning = true;

  ghosts: Ghost[] = makeGhosts();

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
