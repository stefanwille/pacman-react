import { createContext, useContext } from 'react';
import { Game } from '../lib/Game';
import { assert } from '../util/assert';

export const StoreContext = createContext<Game>({} as Game);

export const StoreProvider = StoreContext.Provider;

export const useGame = (): Game => {
  const store = useContext(StoreContext);
  assert(store, 'Store not provided - use <StoreProvider>');
  return store;
};
