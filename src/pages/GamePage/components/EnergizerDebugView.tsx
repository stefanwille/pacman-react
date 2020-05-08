import { Card, Button, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components/macro';
import { useGame } from '../../../components/StoreContext';
import { eatEnergizer } from '../../../model/eatEnergizer';

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const EnergizerDebugView = observer<{ className?: string }>(
  ({ className }) => {
    const game = useGame();
    return (
      <Layout className="EnergizerDebugView">
        <Card title="Energizer" size="small" bordered={false}>
          <Row>
            <Col flex="0 0 200px">
              <div>
                Time left:{' '}
                {formatter.format(
                  Math.abs(game.energizerTimer.timeLeft) / 1000
                )}{' '}
                seconds
              </div>
            </Col>

            <Col flex="0 0 48px"></Col>

            <Col flex="0 0 80px">
              <StyledButton
                size="small"
                shape="round"
                onClick={() => {
                  eatEnergizer(game);
                }}
              >
                Eat
              </StyledButton>
            </Col>
          </Row>
        </Card>
      </Layout>
    );
  }
);

const Layout = styled.div``;

const StyledButton = styled(Button)`
  width: 80px;
`;
