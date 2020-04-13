/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Row, Space, Switch, Typography } from 'antd';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from './StoreContext';

const { Text } = Typography;

export const GhostDebugControls: FC<{}> = observer(() => {
  const store = useStore();
  return (
    <div className="GhostDebugControls">
      <Row style={{ width: 'auto' }}>
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
        <Col flex="0 0 48px"></Col>

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
        <Col flex="0 0 48px"></Col>

        <Col flex="0 0 56px">
          <Switch
            checked={store.debugState.ghostViewOptions.hitBox}
            onChange={action(checked => {
              store.debugState.ghostViewOptions.hitBox = checked;
            })}
          />
        </Col>
        <Col flex="0 0 auto">
          <Text>Show Hitbox</Text>
        </Col>
      </Row>
    </div>
  );
});
