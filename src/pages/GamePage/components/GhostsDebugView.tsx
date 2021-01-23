import { Card } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { GhostDebugControls } from './GhostDebugControls';
import { GhostsDebugTable } from './GhostDebugTable';
import { VSpace } from '../../../components/Spacer';

export const GhostsDebugView: FC = observer(() => {
  return (
    <div className="GhostsDebugView">
      <Card title="Ghosts" size="small" bordered={false}>
        <VSpace size="small" />
        <GhostsDebugTable />
        <VSpace size="32px" />
        <GhostDebugControls />
      </Card>
    </div>
  );
});
