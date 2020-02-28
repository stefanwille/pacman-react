/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import { Board } from '../../components/Board';
import { ExtrafLives } from '../../components/ExtraLives';
import { FPS } from '../../components/FPS';
import { GameOver } from '../../components/GameOver';
import { GhostsView } from '../../components/GhostsView';
import { MazeView } from '../../components/MazeView';
import { PacManView } from '../../components/PacMacView';
import { PillsView } from '../../components/PillsView';
import { Score } from '../../components/Score';
import { StoreProvider } from '../../components/StoreContext';
import { Game } from '../../lib/Game';
import { resetPacMan } from '../../lib/PacMan';
import { useGameLoop } from '../../lib/useGameLoop';
import { Controls } from './Controls';
import './GamePage.css';
import { useKeyboardActions } from './useKeyboardActions';

export const GamePage: React.FC = observer(() => {
  const game = useLocalStore(() => {
    const newStore = new Game();
    resetPacMan(newStore.pacMan);
    newStore.ghosts[0].ghostPaused = false;
    newStore.ghosts[1].ghostPaused = false;
    newStore.ghosts[2].ghostPaused = false;
    newStore.ghosts[3].ghostPaused = false;
    return newStore;
  }, []);

  useGameLoop(game);
  useKeyboardActions(game);

  return (
    <StoreProvider value={game}>
      <div className="Game">
        <Board className="GamePage__Board">
          <MazeView />
          <PillsView />
          <PacManView />
          <GhostsView />
          <GameOver />
        </Board>
        <footer>
          <Score className="GamePage__Score" />
          <ExtrafLives className="GamePage__LivesLeft" />
          <FPS className="GamePage__FPS" />
          <Controls />
        </footer>
      </div>
    </StoreProvider>
  );
});
