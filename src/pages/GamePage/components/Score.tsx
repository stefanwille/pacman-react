import { observer } from 'mobx-react-lite';
import React from 'react';
import { useGame } from '../../../components/StoreContext';
import './Score.css';
import classNames from 'classnames';

export const Score = observer<{ className?: string }>(({ className }) => {
  const store = useGame();
  return (
    <div className={classNames('Score', className)}>
      <span>Score</span>
      <span>{store.score}</span>
    </div>
  );
});
