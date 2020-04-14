import { configure, observable } from 'mobx';
import { Store } from './Store';
import { GhostViewOptions } from './GhostViewOptions';
import { PacManViewOptions } from '../pages/GamePage/components/PacManViewOptions';

configure({ enforceActions: 'observed' });

export class DebugState {
  constructor(store: Store) {
    this.store = store;
  }

  store: Store;

  @observable
  ghostViewOptions: GhostViewOptions = {
    hitBox: false,
    target: false,
    wayPoints: false,
  };

  @observable
  pacManViewOptions: PacManViewOptions = {
    hitBox: false,
  };
}
