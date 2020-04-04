/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { ghostCollidesWithPacMan } from '../lib/detectCollisions';
import { VSpace } from './Spacer';
import { useGame } from './StoreContext';

export const PacManDebugView: FC<{ className?: string }> = observer(
  ({ className }) => {
    const game = useGame();
    return (
      <Layout className="PacManDebugView">
        <Card title="Pac Man" size="small">
          <div>State: {game.pacMan.state}</div>
          <VSpace />

          <Space>
            {game.pacMan.alive && (
              <ButtonStyled
                className="Controls__KillPacMan"
                size="small"
                onClick={() => {
                  ghostCollidesWithPacMan(game.ghosts[0]);
                }}
              >
                Kill Pac Man
              </ButtonStyled>
            )}
            {game.pacMan.dead && (
              <ButtonStyled
                className="Controls__RevivePacMan"
                size="small"
                onClick={game.revivePacMan}
              >
                Revive Pac Man
              </ButtonStyled>
            )}
          </Space>
        </Card>
      </Layout>
    );
  }
);

const Layout = styled.div`
  margin-right: 24px;
`;

const ButtonStyled = styled(Button)`
  min-width: 120px;
`;
