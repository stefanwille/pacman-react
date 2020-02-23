/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { Board } from '../../components/Board';
import { FPS } from '../../components/FPS';
import { GhostsView } from '../../components/GhostsView';
import { MazeView } from '../../components/MazeView';
import { PacManView } from '../../components/PacMacView';
import { PillsView } from '../../components/PillsView';
import { Score } from '../../components/Score';
import { Game } from '../../lib/Game';
import { StoreProvider } from '../../components/StoreContext';
import { useGameLoop } from '../../lib/useGameLoop';
import './GamePage.css';
import { Controls } from './Controls';

const useKeyboard = (store: Game) => {
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    store.pacMan.setPressedKey(event.key);
  }, []);

  const onKeyUp = useCallback(() => {
    store.pacMan.setPressedKey('');
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  });
};

export const GamePage: React.FC = observer(() => {
  const store = useLocalStore(() => {
    const newStore = new Game();
    newStore.pacMan.setTileCoordinates({ x: 1, y: 1 });
    newStore.ghosts[0].ghostPaused = false;
    newStore.ghosts[1].ghostPaused = false;
    newStore.ghosts[2].ghostPaused = false;
    newStore.ghosts[3].ghostPaused = false;
    return newStore;
  }, []);

  useGameLoop(store);
  useKeyboard(store);

  return (
    <StoreProvider value={store}>
      <div className="Game">
        <Board className="GamePage__Board">
          <MazeView />
          <PillsView />
          <PacManView />
          <GhostsView />
        </Board>
        <footer>
          <FPS className="GamePage__FPS" />
          <Score className="GamePage__Score" />
          <Controls />
        </footer>
      </div>
    </StoreProvider>
  );
});
