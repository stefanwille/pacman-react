import React, { FC } from 'react';
import './GameOver.css';
import { useGameStore } from '../../../model/store';
import { Message } from './Message';
import { TotalPacManDyingAnimationLength } from '../../../model/pacManDyingPhase';

export const TOTAL_TIME_TO_GAME_OVER_MESSAGE = TotalPacManDyingAnimationLength;

export const GameOver: FC<{ className?: string }> = ({ className }) => {
  const pacManState = useGameStore((state) => state.game.pacMan.state);
  const extraLivesLeft = useGameStore((state) => state.game.pacMan.extraLivesLeft);
  const diedAtTimestamp = useGameStore((state) => state.game.pacMan.diedAtTimestamp);
  const timestamp = useGameStore((state) => state.game.timestamp);

  const isDead = pacManState === 'dead';
  const isGameOver = isDead && extraLivesLeft === 0;
  const timeSinceDeath = isDead ? timestamp - diedAtTimestamp : 0;
  const gameOverMessageVisible = isGameOver && timeSinceDeath >= TOTAL_TIME_TO_GAME_OVER_MESSAGE;

  return gameOverMessageVisible ? <Message text="Game Over" /> : null;
};
