import React, { FC } from 'react';
import { Controls } from '../pages/GamePage/Controls';
import { FPS } from './FPS';
import { GhostsDebugView } from './GhostsDebugView';
import styled from 'styled-components/macro';
import { Card } from 'antd';

export const Layout = styled.div``;

export const DebugView: FC<{ className?: string }> = ({ className }) => {
  return (
    <Layout className={className}>
      <Card>
        <GhostsDebugView />
        <Controls />
        <FPS />
      </Card>
    </Layout>
  );
};
