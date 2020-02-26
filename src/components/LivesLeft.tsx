/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from './StoreContext';
import './LivesLeft.css';
import classNames from 'classnames';

export const LivesLeft: FC<{ className?: string }> = observer(
  ({ className }) => {
    const game = useStore();
    return (
      <span className={classNames('LivesLeft', className)}>
        <span>Extra Life: </span>
        <span>{game.pacMan.extraLivesLeft}</span>
      </span>
    );
  }
);
