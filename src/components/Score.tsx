/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useGame } from './StoreContext';
import './Score.css';
import classNames from 'classnames';

export const Score: FC<{ className?: string }> = observer(({ className }) => {
  const store = useGame();
  return (
    <div className={classNames('Score', className)}>
      <span>Score</span>
      <span>{store.score}</span>
    </div>
  );
});
