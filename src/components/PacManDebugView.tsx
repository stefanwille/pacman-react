import { Button, Card, Space, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { ghostCollidesWithPacMan } from '../lib/detectCollisions';
import { useGame } from './StoreContext';

export const PacManDebugView: FC<{ className?: string }> = observer(
  ({ className }) => {
    const game = useGame();
    return (
      <Layout className="PacManDebugView">
        <Card title="Pac Man" size="small" bordered={false}>
          <Row>
            <Col flex="0 0 110px">State: {game.pacMan.state}</Col>

            <Col flex="0 0 48px"></Col>

            <Col flex="0 0 auto">
              <Space>
                {game.pacMan.alive && (
                  <ButtonStyled
                    shape="round"
                    size="small"
                    onClick={() => {
                      ghostCollidesWithPacMan(game.ghosts[0]);
                    }}
                  >
                    Kill
                  </ButtonStyled>
                )}
                {game.pacMan.dead && (
                  <ButtonStyled
                    shape="round"
                    size="small"
                    onClick={game.revivePacMan}
                  >
                    Revive
                  </ButtonStyled>
                )}
              </Space>
            </Col>
          </Row>
        </Card>
      </Layout>
    );
  }
);

const Layout = styled.div``;

const ButtonStyled = styled(Button)`
  min-width: 80px;
`;
