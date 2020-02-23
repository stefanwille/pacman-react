/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from '../lib/StoreContext';
import './Score.css';
import classNames from 'classnames';

export const Score: FC<{ className?: string }> = observer(({ className }) => {
  const store = useStore();
  return (
    <span className={classNames('Score', className)}>
      <span>Score: </span>
      <span>{store.score}</span>
    </span>
  );
});
