/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Row, Space, Switch, Typography } from 'antd';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from './StoreContext';
import { Spacer } from './Spacer';

const { Text } = Typography;

export const GhostDebugControls: FC<{}> = observer(() => {
  const store = useStore();
  return (
    <div className="GhostDebugControls">
      <Spacer />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row>
          <Col flex="60px">
            <Switch
              checked={store.debugState.ghostViewOptions.target}
              onChange={action(checked => {
                store.debugState.ghostViewOptions.target = checked;
              })}
            />
          </Col>
          <Col flex="rest">
            <Text>Show Target Tile</Text>
          </Col>
        </Row>

        <Row>
          <Col flex="60px">
            <Switch
              checked={store.debugState.ghostViewOptions.wayPoints}
              onChange={action(checked => {
                store.debugState.ghostViewOptions.wayPoints = checked;
              })}
            />
          </Col>
          <Col flex="rest">
            <Text>Show Waypoints</Text>
          </Col>
        </Row>

        <Row>
          <Col flex="60px">
            <Switch
              checked={store.debugState.ghostViewOptions.hitBox}
              onChange={action(checked => {
                store.debugState.ghostViewOptions.hitBox = checked;
              })}
            />
          </Col>
          <Col flex="rest">
            <Text>Show Hitbox</Text>
          </Col>
        </Row>
      </Space>
    </div>
  );
});
