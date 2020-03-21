import { configure, observable } from 'mobx';
import { Game } from './Game';

configure({ enforceActions: 'observed' });

export class Store {
  @observable
  game: Game = new Game(this);
}
