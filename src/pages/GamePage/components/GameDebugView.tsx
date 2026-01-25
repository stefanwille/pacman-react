/* eslint-disable react/display-name */
import { Button, Card, Col, Row, Switch, Typography } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useGameStore } from '../../../model/store';

const { Text } = Typography;

export const GameDebugView: FC<{ className?: string }> = ({ className }) => {
  const showHitBox = useGameStore((state) => state.debugState.gameViewOptions.hitBox);
  const gamePaused = useGameStore((state) => state.game.gamePaused);
  const setGameViewOption = useGameStore((state) => state.setGameViewOption);
  const setGamePaused = useGameStore((state) => state.setGamePaused);
  const resetGame = useGameStore((state) => state.resetGame);

  return (
    <Layout className="PacManDebugView">
      <Card title="Game" size="small" bordered={false}>
        <Row>
          <Col flex="0 0 56px">
            <Switch
              checked={showHitBox}
              onChange={(checked) => setGameViewOption('hitBox', checked)}
            />
          </Col>
          <Col flex="0 0 auto">
            <Text>Show Hit Boxes</Text>
          </Col>
          <Col flex="0 0 48px"></Col>

          <Col flex="0 0 56px">
            <Switch
              checked={gamePaused}
              onChange={(checked) => setGamePaused(checked)}
            />
          </Col>
          <Col flex="0 0 auto">
            <Text>Paused</Text>
          </Col>
          <Col flex="0 0 48px"></Col>

          <ButtonStyled size="small" onClick={() => resetGame()} shape="round">
            Restart
          </ButtonStyled>
        </Row>
      </Card>
    </Layout>
  );
};

const Layout = styled.div``;

const ButtonStyled = styled(Button)`
  min-width: 80px;
`;
