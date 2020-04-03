/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useGame } from './StoreContext';
import { Card, Table, Button, Switch } from 'antd';
import { Ghost } from '../lib/Ghost';
import { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components/macro';
import { ghostCollidesWithPacMan } from '../lib/detectCollisions';
import { routeAndMoveGhost } from '../lib/updateGhost';
import { action } from 'mobx';

const Layout = styled.div`
  margin-right: 24px;
`;

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
    dataIndex: 'name',
    width: 80,
  },
  {
    title: 'Color',
    dataIndex: 'color',
    width: 80,
  },
  {
    title: '# State Changes',
    width: 80,
    align: 'center',
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
    align: 'right',
    render: record => (
      <GhostCell ghost={record} renderGhost={(ghost: Ghost) => ghost.state} />
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
    render: record => <PausedSwitch ghost={record} />,
  },
  {
    title: '',
    align: 'center',
    render: record => <KillGhostButton ghost={record} />,
  },
  {
    title: '',
    align: 'center',
    render: record => <MoveGhostButton ghost={record} />,
  },
];

const PausedSwitch: FC<{ ghost: Ghost }> = observer(({ ghost }) => (
  <Switch
    checked={ghost.ghostPaused}
    onChange={checked => ghost.setGhostPaused(checked)}
  />
));

const KillGhostButton: FC<{ ghost: Ghost }> = observer(({ ghost }) => (
  <Button
    size="small"
    disabled={ghost.state !== 'frightened'}
    onClick={() => {
      ghostCollidesWithPacMan(ghost);
    }}
  >
    Kill
  </Button>
));

const MoveGhostButton: FC<{ ghost: Ghost }> = observer(({ ghost }) => (
  <Button
    size="small"
    disabled={!ghost.ghostPaused}
    onClick={action(() => {
      routeAndMoveGhost(ghost);
    })}
  >
    Move
  </Button>
));

export const GhostsDebugView: FC<{ className?: string }> = observer(
  ({ className }) => {
    const store = useGame();
    return (
      <Layout className="GhostsDebugView">
        <Card title="Ghosts">
          <Table
            dataSource={store.ghosts}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="ghostNumber"
          />
        </Card>
      </Layout>
    );
  }
);
