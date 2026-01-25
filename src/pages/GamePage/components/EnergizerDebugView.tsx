import { Card, Button, Row, Col } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useGameStore } from '../../../model/store';
import { eatEnergizer } from '../../../model/eatEnergizer';

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const EnergizerDebugView: FC<{ className?: string }> = ({ className }) => {
  const energizerTimer = useGameStore((state) => state.game.energizerTimer);
  const timeLeft = energizerTimer.duration - energizerTimer.timeSpent;

  return (
    <Layout className="EnergizerDebugView">
      <Card title="Energizer" size="small" bordered={false}>
        <Row>
          <Col flex="0 0 200px">
            <div>
              Time left:{' '}
              {formatter.format(Math.abs(timeLeft) / 1000)}{' '}
              seconds
            </div>
          </Col>

          <Col flex="0 0 48px"></Col>

          <Col flex="0 0 80px">
            <StyledButton
              size="small"
              shape="round"
              onClick={() => {
                eatEnergizer();
              }}
            >
              Eat
            </StyledButton>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

const Layout = styled.div``;

const StyledButton = styled(Button)`
  width: 80px;
`;
