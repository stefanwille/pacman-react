import { Card, Button, Row, Col, Descriptions } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useGame } from './StoreContext';
import { eatEnergizer } from '../lib/eatEnergizer';

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const EnergizerDebugView: FC<{ className?: string }> = observer(
  ({ className }) => {
    const game = useGame();
    return (
      <Layout className="EnergizerDebugView">
        <Card title="Energizer" size="small" bordered={false}>
          <Row>
            <Col flex="0 0 200px">
              <Descriptions>
                <Descriptions.Item label="Time left">
                  {formatter.format(game.energizerTimer.timeLeft / 1000)}{' '}
                  seconds
                </Descriptions.Item>
              </Descriptions>
            </Col>

            <Col flex="0 0 48px"></Col>

            <Col flex="0 0 auto">
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
