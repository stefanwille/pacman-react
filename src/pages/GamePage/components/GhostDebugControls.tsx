import { Col, Row, Switch, Typography } from 'antd';
import React, { FC } from 'react';
import { useGameStore } from '../../../model/store';

const { Text } = Typography;

export const GhostDebugControls: FC = () => {
  const showTarget = useGameStore((state) => state.debugState.ghostViewOptions.target);
  const showWayPoints = useGameStore((state) => state.debugState.ghostViewOptions.wayPoints);
  const setGhostViewOption = useGameStore((state) => state.setGhostViewOption);

  return (
    <div className="GhostDebugControls">
      <Row>
        <Col flex="0 0 56px">
          <Switch
            checked={showTarget}
            onChange={(checked) => setGhostViewOption('target', checked)}
          />
        </Col>
        <Col flex="0 0 auto">
          <Text>Show Target Tile</Text>
        </Col>
        <Col flex="0 0 56px"></Col>

        <Col flex="0 0 56px">
          <Switch
            checked={showWayPoints}
            onChange={(checked) => setGhostViewOption('wayPoints', checked)}
          />
        </Col>
        <Col flex="0 0 auto">
          <Text>Show Waypoints</Text>
        </Col>
        <Col flex="0 0 56px"></Col>
      </Row>
    </div>
  );
};
