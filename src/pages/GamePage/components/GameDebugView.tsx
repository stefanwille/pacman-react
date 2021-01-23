/* eslint-disable react/display-name */
import { Button, Card, Col, Row, Switch, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components/macro';
import { useGame, useStore } from '../../../components/StoreContext';
import { action } from 'mobx';

const { Text } = Typography;

export const GameDebugView = observer<{ className?: string }>(
  ({ className }) => {
    const store = useStore();
    const game = useGame();
    return (
      <Layout className="PacManDebugView">
        <Card title="Game" size="small" bordered={false}>
          <Row>
            <Col flex="0 0 56px">
              <Switch
                checked={store.debugState.gameViewOptions.hitBox}
                onChange={action(
                  checked => (store.debugState.gameViewOptions.hitBox = checked)
                )}
              />
            </Col>
            <Col flex="0 0 auto">
              <Text>Show Hit Boxes</Text>
            </Col>
            <Col flex="0 0 48px"></Col>

            <Col flex="0 0 56px">
              <Switch
                checked={game.gamePaused}
                onChange={checked => {
                  game.gamePaused = checked;
                }}
              />
            </Col>
            <Col flex="0 0 auto">
              <Text>Paused</Text>
            </Col>
            <Col flex="0 0 48px"></Col>

            <ButtonStyled size="small" onClick={store.resetGame} shape="round">
              Restart
            </ButtonStyled>
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
