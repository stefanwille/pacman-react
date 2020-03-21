import { createContext, useContext } from 'react';
import { Game } from '../lib/Game';
import { assert } from '../util/assert';
import { Store } from '../lib/Store';

export const StoreContext = createContext<Store | null>(null);

export const StoreProvider = StoreContext.Provider;

export const useStore = (): Store => {
  const store = useContext(StoreContext);
  assert(store, 'Store not provided - use <StoreProvider>');
  return store;
};

export const useGame = (): Game => {
  const store = useStore();
  return store.game;
};
