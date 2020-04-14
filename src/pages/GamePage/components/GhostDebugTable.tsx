/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Row, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { action } from 'mobx';
import { observer, Observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components';
import { ghostCollidesWithPacMan } from '../../../model/detectCollisions';
import { Ghost } from '../../../model/Ghost';
import { routeAndMoveGhost } from '../../../model/updateGhost';
import { useGame } from './StoreContext';

type RenderGhost = (ghost: Ghost) => JSX.Element | string;

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
    title: '# St. Chgs.',
    width: 100,
    align: 'right',
    render: ghost => <Observer>{() => ghost.stateChanges.toString()}</Observer>,
  },
  {
    title: 'State',
    width: 80,
    align: 'center',
    render: ghost => <Observer>{() => ghost.state.toString()}</Observer>,
  },
  {
    title: 'Tile',
    width: 120,
    align: 'left',
    render: ghost => (
      <Observer>
        {(): any =>
          `x: ${ghost.tileCoordinates.x}, y: ${ghost.tileCoordinates.y}`
        }
      </Observer>
    ),
  },
  {
    title: 'Paused',
    align: 'center',
    width: 80,
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
    onChange={checked => ghost.setGhostPaused(checked)}
  />
));

const KillButton: FC<{ ghost: Ghost }> = observer(({ ghost }) => (
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

const MoveButton: FC<{ ghost: Ghost }> = observer(({ ghost }) => (
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

export const GhostsDebugTable: FC<{ className?: string }> = observer(
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
