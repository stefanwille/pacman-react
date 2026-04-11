import { Card } from 'antd';
import React, { FC } from 'react';
import { GhostDebugControls } from './GhostDebugControls';
import { GhostsDebugTable } from './GhostDebugTable';
import { VSpace } from '../../../components/Spacer';

export const GhostsDebugView: FC = () => {
  return (
    <div className="GhostsDebugView">
      <Card title="Ghosts" size="small" variant="borderless">
        <VSpace size="small" />
        <GhostsDebugTable />
        <VSpace size="32px" />
        <GhostDebugControls />
      </Card>
    </div>
  );
};
