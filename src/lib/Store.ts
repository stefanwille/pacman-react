import { configure, observable, action } from 'mobx';
import { Game } from './Game';

configure({ enforceActions: 'observed' });

export class Store {
  @observable
  game: Game = new Game(this);

  @action.bound
  resetGame() {
    this.game = new Game(this);
    this.game.readyGameForPlay();
  }
}
