/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import './GameOver.css';
import { useStore } from './StoreContext';
import { Message } from './Message';

export const GameOver: FC<{ className?: string }> = observer(
  ({ className }) => {
    const game = useStore();
    return game.gameOverMessageVisible ? <Message text="Game Over" /> : null;
  }
);
