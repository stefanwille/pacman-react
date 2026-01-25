import { useGameStore, Store, GameState, DebugState } from '../model/store';

// Re-export the Zustand store hook as the main store access
export { useGameStore };

// Compatibility hooks that match the old API
export const useStore = (): Store => useGameStore();
export const useGame = (): GameState => useGameStore((state) => state.game);
export const useDebugState = (): DebugState => useGameStore((state) => state.debugState);

// For components that need to select specific state
export const useGameState = <T>(selector: (state: Store) => T): T => {
  return useGameStore(selector);
};

// Re-export Store type for backwards compatibility
export type { Store, GameState, DebugState };
