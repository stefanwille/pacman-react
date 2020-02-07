import { createContext, useContext } from 'react';
import { GameStore } from './GameStore';

export const StoreContext = createContext<GameStore>(new GameStore());

export const StoreProvider = StoreContext.Provider;

export const useStore = (): GameStore => useContext(StoreContext);
