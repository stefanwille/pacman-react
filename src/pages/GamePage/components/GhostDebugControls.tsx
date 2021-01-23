import { Col, Row, Switch, Typography } from 'antd';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../components/StoreContext';

const { Text } = Typography;

export const GhostDebugControls = observer(() => {
  const store = useStore();
  return (
    <div className="GhostDebugControls">
      <Row>
        <Col flex="0 0 56px">
          <Switch
            checked={store.debugState.ghostViewOptions.target}
            onChange={action(checked => {
              store.debugState.ghostViewOptions.target = checked;
            })}
          />
        </Col>
        <Col flex="0 0 auto">
          <Text>Show Target Tile</Text>
        </Col>
        <Col flex="0 0 56px"></Col>

        <Col flex="0 0 56px">
          <Switch
            checked={store.debugState.ghostViewOptions.wayPoints}
            onChange={action(checked => {
              store.debugState.ghostViewOptions.wayPoints = checked;
            })}
          />
        </Col>
        <Col flex="0 0 auto">
          <Text>Show Waypoints</Text>
        </Col>
        <Col flex="0 0 56px"></Col>
      </Row>
    </div>
  );
});
