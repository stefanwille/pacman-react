import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import './GameOver.css';
import { useGame } from '../../../components/StoreContext';
import { Message } from './Message';
import { TotalPacManDyingAnimationLength } from '../../../model/pacManDyingPhase';

export const TOTAL_TIME_TO_GAME_OVER_MESSAGE = TotalPacManDyingAnimationLength;

export const GameOver: FC<{ className?: string }> = observer(
  ({ className }) => {
    const game = useGame();
    const { pacMan } = game;
    const gameOverMessageVisible =
      game.gameOver && pacMan.timeSinceDeath >= TOTAL_TIME_TO_GAME_OVER_MESSAGE;

    return gameOverMessageVisible ? <Message text="Game Over" /> : null;
  }
);
