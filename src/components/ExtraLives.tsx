/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from './StoreContext';
import './ExtraLives.css';
import classNames from 'classnames';

export const ExtraLives: FC<{ className?: string }> = observer(
  ({ className }) => {
    const game = useStore();
    return (
      <span className={classNames('ExtraLives', className)}>
        <span>Extra Lifes</span>
        <span>{game.pacMan.extraLivesLeft}</span>
      </span>
    );
  }
);
