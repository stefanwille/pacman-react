/* eslint-disable react/display-name */
import { Button, Row, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { action } from 'mobx';
import { observer, Observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components';
import { ghostCollidesWithPacMan } from '../../../model/detectCollisions';
import { Ghost } from '../../../model/Ghost';
import { routeAndMoveGhost } from '../../../model/updateGhosts';
import { useGame } from '../../../components/StoreContext';

const columns: ColumnsType<Ghost> = [
  {
    title: 'Nr',
    dataIndex: 'ghostNumber',
    width: 50,
    align: 'center',
  },
  {
    title: 'Name',
    width: 80,
    render: (ghost: Ghost) => (
      <Row align="middle">
        <Dot color={ghost.colorCode} size={7} />
        &nbsp;&nbsp;
        {ghost.name}
      </Row>
    ),
  },
  {
    title: 'State',
    width: 80,
    align: 'center',
    render: ghost => <Observer>{() => ghost.state.toString()}</Observer>,
  },
  {
    title: '# Changes',
    width: 80,
    align: 'right',
    render: ghost => <Observer>{() => ghost.stateChanges.toString()}</Observer>,
  },
  {
    title: 'X',
    width: 32,
    align: 'right',
    render: ghost => <Observer>{(): any => ghost.tileCoordinates.x}</Observer>,
  },
  {
    title: 'Y',
    width: 32,
    align: 'right',
    render: ghost => <Observer>{(): any => ghost.tileCoordinates.y}</Observer>,
  },
  {
    title: 'Paused',
    align: 'center',
    render: ghost => <PausedSwitch ghost={ghost} />,
  },
  {
    title: '',
    align: 'center',
    width: 60,
    render: ghost => <KillButton ghost={ghost} />,
  },
  {
    title: '',
    align: 'center',
    width: 60,
    render: record => <MoveButton ghost={record} />,
  },
  {
    title: '',
    render: record => null,
  },
];

const PausedSwitch: FC<{ ghost: Ghost }> = observer(({ ghost }) => (
  <Switch
    checked={ghost.ghostPaused}
    onChange={checked => {
      ghost.ghostPaused = checked;
    }}
  />
));

const KillButton = observer<{ ghost: Ghost }>(({ ghost }) => (
  <Button
    size="small"
    shape="round"
    disabled={!ghost.frightened}
    onClick={() => {
      ghostCollidesWithPacMan(ghost);
    }}
  >
    Kill
  </Button>
));

const MoveButton = observer<{ ghost: Ghost }>(({ ghost }) => (
  <Button
    size="small"
    shape="round"
    onClick={action(() => {
      routeAndMoveGhost(ghost);
    })}
  >
    Move
  </Button>
));

export const GhostsDebugTable = observer<{ className?: string }>(
  ({ className }) => {
    const store = useGame();
    return (
      <Table
        className={className}
        dataSource={store.ghosts}
        columns={columns}
        pagination={false}
        size="small"
        rowKey="ghostNumber"
      />
    );
  }
);

interface DotProps {
  color: string;
  size: number;
}

const Dot = styled.div<DotProps>`
  border-radius: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  display: inline-block;
`;
