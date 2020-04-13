import { Card, Space } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { EnergizerDebugView } from './EnergizerDebugView';
import { GhostsDebugView } from './GhostsDebugView';
import { PacManDebugView } from './PacManDebugView';
import { GameDebugView } from './GameDebugView';

export const Layout = styled.div``;

export const DebugView: FC<{ className?: string }> = ({ className }) => {
  return (
    <Layout className={className}>
      <Card>
        <Space direction="vertical" size="middle">
          <GameDebugView />
          <PacManDebugView />
          <GhostsDebugView />
          <EnergizerDebugView />
        </Space>
      </Card>
    </Layout>
  );
};
