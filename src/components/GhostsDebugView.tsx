import { Card } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { GhostDebugControls } from '../pages/GamePage/components/GhostDebugControls';
import { GhostsDebugTable } from '../pages/GamePage/components/GhostDebugTable';
import { VSpace } from './Spacer';

export const GhostsDebugView: FC<{}> = observer(() => {
  return (
    <div className="GhostsDebugView">
      <Card title="Ghosts" size="small" bordered={false}>
        <GhostsDebugTable />
        <VSpace size="32px" />
        <GhostDebugControls />
      </Card>
    </div>
  );
});
