import { Button, Card, Space, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components/macro';
import { ghostCollidesWithPacMan } from '../../../model/detectCollisions';
import { useGame } from '../../../components/StoreContext';

export const PacManDebugView = observer<{ className?: string }>(
  ({ className }) => {
    const game = useGame();
    return (
      <Layout className="PacManDebugView">
        <Card title="Pac Man" size="small" bordered={false}>
          <Row>
            <Col flex="0 0 104px">State: {game.pacMan.state}</Col>

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
