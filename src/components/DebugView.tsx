import React, { FC } from 'react';
import { Controls } from '../pages/GamePage/Controls';
import { FPS } from './FPS';
import { GhostsDebugView } from './GhostsDebugView';
import styled from 'styled-components/macro';
import { Card } from 'antd';
import { EnergizerDebugView } from './EnergizerDebugView';
import { Spacer } from './Spacer';

export const Layout = styled.div``;

export const DebugView: FC<{ className?: string }> = ({ className }) => {
  return (
    <Layout className={className}>
      <Card>
        <GhostsDebugView />
        <Spacer />
        <EnergizerDebugView />
        <Controls />
        <FPS />
      </Card>
    </Layout>
  );
};
