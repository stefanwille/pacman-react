/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from '../../components/StoreContext';
import { ghostCollidesWithPacMan } from '../../lib/detectCollisions';
import styled from 'styled-components/macro';

const Layout = styled.div`
  margin-top: 12px;
`;

export const Controls: FC<{}> = observer(() => {
  const game = useStore();
  return (
    <Layout className="Controls">
      <a onClick={game.toggleGamePaused}>{game.gamePaused ? 'Run' : 'Pause'}</a>
      &nbsp;
      {game.pacMan.state !== 'dead' && (
        <a
          onClick={() => {
            ghostCollidesWithPacMan(game.ghosts[0]);
          }}
        >
          Kill Pac Man
        </a>
      )}
      {game.pacMan.state === 'dead' && (
        <a onClick={game.revivePacMan}>Revive Pac Man</a>
      )}
    </Layout>
  );
});
