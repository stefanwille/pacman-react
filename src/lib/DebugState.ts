import { configure, observable } from 'mobx';
import { GhostViewOptions } from '../components/GhostsView';
import { Store } from './Store';

configure({ enforceActions: 'observed' });

export class DebugState {
  constructor(store: Store) {
    this.store = store;
  }

  store: Store;

  @observable
  ghostViewOptions: GhostViewOptions = {
    hitBox: false,
    target: true,
    wayPoints: false,
  };
}
