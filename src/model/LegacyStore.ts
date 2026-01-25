import { observable, action, makeObservable } from 'mobx';
import { Game } from './Game';
import { DebugState } from './DebugState';

export class Store {
  constructor() {
    makeObservable(this);
  }

  @observable
  game: Game = new Game(this);

  debugState = new DebugState(this);

  @action.bound
  resetGame() {
    this.game = new Game(this);
    this.game.readyGameForPlay();
  }
}
