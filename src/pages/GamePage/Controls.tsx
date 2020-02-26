/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from '../../components/StoreContext';
import { ghostCollidesWithPacMan } from '../../lib/detectCollisions';

export const Controls: FC<{}> = observer(() => {
  const game = useStore();
  return (
    <>
      <a onClick={game.toggleGamePaused}>{game.gamePaused ? 'Run' : 'Pause'}</a>
      &nbsp;
      {game.pacMan.state !== 'dead' && (
        <a
          onClick={() => {
            ghostCollidesWithPacMan(game);
          }}
        >
          Kill Pac Man
        </a>
      )}
      {game.pacMan.state === 'dead' && (
        <a onClick={game.revivePacMan}>Revive Pac Man</a>
      )}
    </>
  );
});
