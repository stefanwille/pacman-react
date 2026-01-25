/* eslint-disable react/display-name */
import { Button, Row, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FC } from 'react';
import styled from 'styled-components';
import { ghostCollidesWithPacMan } from '../../../model/detectCollisions';
import { useGameStore, GhostState } from '../../../model/store';
import { tileFromScreen } from '../../../model/Coordinates';

// Create a wrapper component for each ghost row to get fresh data
const GhostStateCell: FC<{ ghostIndex: number; render: (ghost: GhostState) => React.ReactNode }> = ({ ghostIndex, render }) => {
  const ghost = useGameStore((state) => state.game.ghosts[ghostIndex]);
  return <>{render(ghost)}</>;
};

const TileXCell: FC<{ ghostIndex: number }> = ({ ghostIndex }) => {
  const ghost = useGameStore((state) => state.game.ghosts[ghostIndex]);
  const tile = tileFromScreen(ghost.screenCoordinates);
  return <>{tile.x}</>;
};

const TileYCell: FC<{ ghostIndex: number }> = ({ ghostIndex }) => {
  const ghost = useGameStore((state) => state.game.ghosts[ghostIndex]);
  const tile = tileFromScreen(ghost.screenCoordinates);
  return <>{tile.y}</>;
};

const columns: ColumnsType<GhostState> = [
  {
    title: 'Nr',
    dataIndex: 'ghostNumber',
    width: 50,
    align: 'center',
  },
  {
    title: 'Name',
    width: 80,
    render: (_, ghost: GhostState) => (
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
    render: (_, ghost: GhostState) => (
      <GhostStateCell
        ghostIndex={ghost.ghostNumber}
        render={(g) => g.state.toString()}
      />
    ),
  },
  {
    title: '# Changes',
    width: 80,
    align: 'right',
    render: (_, ghost: GhostState) => (
      <GhostStateCell
        ghostIndex={ghost.ghostNumber}
        render={(g) => g.stateChanges.toString()}
      />
    ),
  },
  {
    title: 'X',
    width: 32,
    align: 'right',
    render: (_, ghost: GhostState) => <TileXCell ghostIndex={ghost.ghostNumber} />,
  },
  {
    title: 'Y',
    width: 32,
    align: 'right',
    render: (_, ghost: GhostState) => <TileYCell ghostIndex={ghost.ghostNumber} />,
  },
  {
    title: 'Paused',
    align: 'center',
    render: (_, ghost: GhostState) => <PausedSwitch ghostIndex={ghost.ghostNumber} />,
  },
  {
    title: '',
    align: 'center',
    width: 60,
    render: (_, ghost: GhostState) => <KillButton ghostIndex={ghost.ghostNumber} />,
  },
  {
    title: '',
    align: 'center',
    width: 60,
    render: (_, ghost: GhostState) => <MoveButton ghostIndex={ghost.ghostNumber} />,
  },
  {
    title: '',
    render: () => null,
  },
];

const PausedSwitch: FC<{ ghostIndex: number }> = ({ ghostIndex }) => {
  const ghostPaused = useGameStore((state) => state.game.ghosts[ghostIndex].ghostPaused);
  const setGhostPaused = useGameStore((state) => state.setGhostPaused);

  return (
    <Switch
      checked={ghostPaused}
      onChange={(checked) => {
        setGhostPaused(ghostIndex, checked);
      }}
    />
  );
};

const KillButton: FC<{ ghostIndex: number }> = ({ ghostIndex }) => {
  const isFrightened = useGameStore((state) => state.game.ghosts[ghostIndex].state === 'frightened');

  return (
    <Button
      size="small"
      shape="round"
      disabled={!isFrightened}
      onClick={() => {
        ghostCollidesWithPacMan(ghostIndex);
      }}
    >
      Kill
    </Button>
  );
};

const MoveButton: FC<{ ghostIndex: number }> = ({ ghostIndex }) => {
  // Move button is disabled for now since routeAndMoveGhost is no longer exported
  // This is a debug feature that can be re-implemented if needed
  return (
    <Button
      size="small"
      shape="round"
      disabled={true}
    >
      Move
    </Button>
  );
};

export const GhostsDebugTable: FC<{ className?: string }> = ({ className }) => {
  const ghosts = useGameStore((state) => state.game.ghosts);

  return (
    <Table
      className={className}
      dataSource={ghosts}
      columns={columns}
      pagination={false}
      size="small"
      rowKey="ghostNumber"
    />
  );
};

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
