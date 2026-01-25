import React, { FC } from 'react';
import { useGameStore } from '../../../model/store';
import './Score.css';
import classNames from 'classnames';

export const Score: FC<{ className?: string }> = ({ className }) => {
  const score = useGameStore((state) => state.game.score);
  return (
    <div className={classNames('Score', className)}>
      <span>Score</span>
      <span>{score}</span>
    </div>
  );
};
