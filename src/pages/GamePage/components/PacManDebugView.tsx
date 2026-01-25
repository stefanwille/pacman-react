import { Button, Card, Space, Row, Col } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { ghostCollidesWithPacMan } from '../../../model/detectCollisions';
import { useGameStore } from '../../../model/store';

export const PacManDebugView: FC<{ className?: string }> = ({ className }) => {
  const pacManState = useGameStore((state) => state.game.pacMan.state);
  const sendPacManEvent = useGameStore((state) => state.sendPacManEvent);

  const isDead = pacManState === 'dead';
  const isAlive = !isDead;

  const handleKill = () => {
    ghostCollidesWithPacMan(0); // Collide with first ghost
  };

  const handleRevive = () => {
    sendPacManEvent('REVIVED');
  };

  return (
    <Layout className="PacManDebugView">
      <Card title="Pac Man" size="small" bordered={false}>
        <Row>
          <Col flex="0 0 104px">{`State: ${pacManState}`}</Col>

          <Col flex="0 0 48px"></Col>

          <Col flex="0 0 auto">
            <Space>
              {isAlive && (
                <ButtonStyled
                  shape="round"
                  size="small"
                  onClick={handleKill}
                >
                  Kill
                </ButtonStyled>
              )}
              {isDead && (
                <ButtonStyled
                  shape="round"
                  size="small"
                  onClick={handleRevive}
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
};

const Layout = styled.div``;

const ButtonStyled = styled(Button)`
  min-width: 80px;
`;
