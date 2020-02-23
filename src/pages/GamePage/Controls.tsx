/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from '../../components/StoreContext';

export const Controls: FC<{}> = observer(() => {
  const store = useStore();
  return (
    <>
      <a onClick={store.toggleGamePaused}>
        {store.gamePaused ? 'Run' : 'Pause'}
      </a>
      &nbsp;
      {store.pacMan.state !== 'dead' && (
        <a onClick={store.killPacMan}>Kill Pac Man</a>
      )}
      {store.pacMan.state === 'dead' && (
        <a onClick={store.revivePacMan}>Revive Pac Man</a>
      )}
    </>
  );
});
