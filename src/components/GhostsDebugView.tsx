/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from './StoreContext';
import { Card, Table } from 'antd';
import { Ghost } from '../lib/Ghost';
import { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components/macro';

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
    title: 'State',
    width: 80,
    align: 'center',
    render: record => (
      <GhostCell ghost={record} renderGhost={(ghost: Ghost) => ghost.state} />
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
    title: 'Paused',
    align: 'center',
    render: record => (
      <GhostCell
        ghost={record}
        renderGhost={(ghost: Ghost) => ghost.ghostPaused.toString()}
      />
    ),
  },
];

export const GhostsDebugView: FC<{ className?: string }> = observer(
  ({ className }) => {
    const store = useStore();
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
