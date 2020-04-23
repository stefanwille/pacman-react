import { configure, observable } from 'mobx';
import { Store } from './Store';
import { GhostViewOptions } from './GhostViewOptions';
import { PacManViewOptions } from '../pages/GamePage/components/PacManViewOptions';
import { GameViewOptions } from './GameViewOptions';

configure({ enforceActions: 'observed' });

export class DebugState {
  constructor(store: Store) {
    this.store = store;
  }

  store: Store;

  @observable
  gameViewOptions: GameViewOptions = {
    hitBox: false,
  };

  @observable
  ghostViewOptions: GhostViewOptions = {
    target: false,
    wayPoints: false,
  };

  @observable
  pacManViewOptions: PacManViewOptions = {
    somePlaceholder: false,
  };
}
