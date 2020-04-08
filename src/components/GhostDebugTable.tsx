/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Row, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components';
import { ghostCollidesWithPacMan } from '../lib/detectCollisions';
import { Ghost } from '../lib/Ghost';
import { routeAndMoveGhost } from '../lib/updateGhost';
import { useGame } from './StoreContext';

type RenderGhost = (ghost: Ghost) => JSX.Element | string;

const GhostCell: FC<{
  ghost: Ghost;
  renderGhost: RenderGhost;
}> = observer(({ ghost, renderGhost }) => <>{renderGhost(ghost)}</>);

const columns: ColumnsType<Ghost> = [
  {
    title: 'Number',
    dataIndex: 'ghostNumber',
    width: 50,
    align: 'center',
  },
  {
    title: 'Name',
    width: 120,
    render: (ghost: Ghost) => (
      <Row align="middle">
        <Dot color={ghost.colorCode} size={6} />
        &nbsp;
        {ghost.name}
      </Row>
    ),
  },
  {
    title: '# State Changes',
    width: 80,
    align: 'right',
    render: record => (
      <GhostCell
        ghost={record}
        renderGhost={(ghost: Ghost) => ghost.stateChanges.toString()}
      />
    ),
  },
  {
    title: 'State',
    width: 80,
    align: 'center',
    render: record => (
      <GhostCell
        ghost={record}
        renderGhost={(ghost: Ghost) => ghost.state.toString()}
      />
    ),
  },
  {
    title: 'Tile',
    width: 120,
    align: 'left',
    render: record => (
      <GhostCell
        ghost={record}
        renderGhost={(ghost: Ghost) =>
          `x: ${ghost.tileCoordinates.x}, y: ${ghost.tileCoordinates.y}`
        }
      />
    ),
  },
  {
    title: 'Paused',
    align: 'center',
    width: 80,
    render: record => <PausedSwitch ghost={record} />,
  },
  {
    title: '',
    align: 'center',
    width: 60,
    render: record => <KillButton ghost={record} />,
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
