/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Space, Row, Col, Switch, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useGame, useStore } from './StoreContext';
import { VSpace } from './Spacer';

const { Text } = Typography;

export const GameDebugView: FC<{ className?: string }> = observer(
  ({ className }) => {
    const store = useStore();
    const game = useGame();
    return (
      <Layout className="PacManDebugView">
        <Card title="Game" size="small">
          <div>
            <Row>
              <Col flex="60px">
                <Switch
                  checked={game.gamePaused}
                  onChange={checked => game.setGamePaused(checked)}
                />
              </Col>
              <Col flex="rest">
                <Text>Paused</Text>
              </Col>
            </Row>
          </div>
          <VSpace size="medium" />
          <ButtonStyled size="small" onClick={store.resetGame} shape="round">
            Restart Game
          </ButtonStyled>
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
