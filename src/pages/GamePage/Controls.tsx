/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useGame, useStore } from '../../components/StoreContext';
import { ghostCollidesWithPacMan } from '../../lib/detectCollisions';
import styled from 'styled-components/macro';
import { Button } from 'antd';

const Layout = styled.div`
  margin-top: 24px;

  .Controls__Pause {
    min-width: 100px;
  }

  .Controls__KillPacMan,
  .Controls__RevivePacMan {
    min-width: 120px;
  }

  button {
    margin-right: 8px;
  }
`;

export const Controls: FC<{}> = observer(() => {
  const store = useStore();
  const game = useGame();
  return (
    <Layout className="Controls">
      <Button
        className="Controls__Pause"
        size="small"
        onClick={game.toggleGamePaused}
      >
        {game.gamePaused ? 'Play' : 'Pause'}
      </Button>
      <Button size="small" onClick={store.resetGame}>
        Restart Game
      </Button>
      {game.pacMan.state !== 'dead' && (
        <Button
          className="Controls__KillPacMan"
          size="small"
          onClick={() => {
            ghostCollidesWithPacMan(game.ghosts[0]);
          }}
        >
          Kill Pac Man
        </Button>
      )}
      {game.pacMan.state === 'dead' && (
        <Button
          className="Controls__RevivePacMan"
          size="small"
          onClick={game.revivePacMan}
        >
          Revive Pac Man
        </Button>
      )}
    </Layout>
  );
});
