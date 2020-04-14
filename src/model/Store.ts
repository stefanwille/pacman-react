import { configure, observable, action } from 'mobx';
import { Game } from './Game';
import { DebugState } from './DebugState';

configure({ enforceActions: 'observed' });

export class Store {
  @observable
  game: Game = new Game(this);

  debugState = new DebugState(this);

  @action.bound
  resetGame() {
    this.game = new Game(this);
    this.game.readyGameForPlay();
  }
}
