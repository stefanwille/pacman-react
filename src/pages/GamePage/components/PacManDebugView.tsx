import { Button, Card, Space, Row, Col, Switch, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { ghostCollidesWithPacMan } from '../../../model/detectCollisions';
import { useGame, useStore } from './StoreContext';
import { action } from 'mobx';

const { Text } = Typography;

export const PacManDebugView: FC<{ className?: string }> = observer(
  ({ className }) => {
    const store = useStore();
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

            <Col flex="0 0 64px"></Col>

            <Col flex="0 0 56px">
              <Switch
                checked={store.debugState.pacManViewOptions.hitBox}
                onChange={action(checked => {
                  store.debugState.pacManViewOptions.hitBox = checked;
                })}
              />
            </Col>
            <Col flex="0 0 auto">
              <Text>Show Hitbox</Text>
            </Col>
            <Col flex="0 0 48px"></Col>
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
