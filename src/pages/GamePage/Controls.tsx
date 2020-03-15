/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from '../../components/StoreContext';
import { ghostCollidesWithPacMan } from '../../lib/detectCollisions';
import styled from 'styled-components/macro';
import { Button } from 'antd';

const Layout = styled.div`
  margin-top: 24px;
`;

export const Controls: FC<{}> = observer(() => {
  const game = useStore();
  return (
    <Layout className="Controls">
      <Button onClick={game.toggleGamePaused}>
        {game.gamePaused ? 'Play' : 'Pause'}
      </Button>
      &nbsp;
      {game.pacMan.state !== 'dead' && (
        <Button
          onClick={() => {
            ghostCollidesWithPacMan(game.ghosts[0]);
          }}
        >
          Kill Pac Man
        </Button>
      )}
      {game.pacMan.state === 'dead' && (
        <Button onClick={game.revivePacMan}>Revive Pac Man</Button>
      )}
    </Layout>
  );
});
