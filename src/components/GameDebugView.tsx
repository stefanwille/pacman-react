/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Col, Row, Switch, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useGame, useStore } from './StoreContext';

const { Text } = Typography;

export const GameDebugView: FC<{ className?: string }> = observer(
  ({ className }) => {
    const store = useStore();
    const game = useGame();
    return (
      <Layout className="PacManDebugView">
        <Card title="Game" size="small" bordered={false}>
          <Row>
            <Col flex="0 0 56px">
              <Switch
                checked={game.gamePaused}
                onChange={checked => game.setGamePaused(checked)}
              />
            </Col>
            <Col flex="0 0 auto">
              <Text>Paused</Text>
            </Col>
            <Col flex="0 0 48px"></Col>

            <ButtonStyled size="small" onClick={store.resetGame} shape="round">
              Restart Game
            </ButtonStyled>
          </Row>
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
