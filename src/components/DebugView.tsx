import { Card, Space } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { Controls } from '../pages/GamePage/Controls';
import { EnergizerDebugView } from './EnergizerDebugView';
import { FPS } from './FPS';
import { GhostsDebugView } from './GhostsDebugView';
import { PacManDebugView } from './PacManDebugView';

export const Layout = styled.div``;

export const DebugView: FC<{ className?: string }> = ({ className }) => {
  return (
    <Layout className={className}>
      <Card>
        <Space direction="vertical" size="large">
          <PacManDebugView />
          <GhostsDebugView />
          <EnergizerDebugView />
          <Controls />
        </Space>
        <FPS />
      </Card>
    </Layout>
  );
};
