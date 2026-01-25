import { useCallback, useEffect } from 'react';
import { useGameStore } from '../../../model/store';

/* eslint-disable  react-hooks/exhaustive-deps */
export const useKeyboardActions = (): void => {
  const setPacManNextDirection = useGameStore((state) => state.setPacManNextDirection);
  const setGamePaused = useGameStore((state) => state.setGamePaused);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    const pressedKey = event.key;
    const gamePaused = useGameStore.getState().game.gamePaused;

    switch (pressedKey) {
      case 'ArrowLeft':
        setPacManNextDirection('LEFT');
        break;
      case 'ArrowRight':
        setPacManNextDirection('RIGHT');
        break;
      case 'ArrowUp':
        setPacManNextDirection('UP');
        break;
      case 'ArrowDown':
        setPacManNextDirection('DOWN');
        break;
      case ' ':
        setGamePaused(!gamePaused);
        break;
      default:
        break;
    }
  }, [setPacManNextDirection, setGamePaused]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};
