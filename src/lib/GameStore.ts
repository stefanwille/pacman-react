import { configure, observable, action, computed } from 'mobx';

import { PacManStore } from './PacManStore';
import { GhostStore, makeGhosts } from './GhostStore';
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

  ghosts: GhostStore[] = makeGhosts();

  pacMan = new PacManStore();

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
}
