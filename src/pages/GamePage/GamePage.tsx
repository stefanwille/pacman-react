/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Row } from 'antd';
import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components/macro';
import { Board } from '../../components/Board';
import { DebugView } from '../../components/DebugView';
import { ExtraLives } from '../../components/ExtraLives';
import { GameOver } from '../../components/GameOver';
import { GhostsGameView } from '../../components/GhostsView';
import { MazeView } from '../../components/MazeView';
import { PacManView } from '../../components/PacManView';
import { PillsView } from '../../components/PillsView';
import { Score } from '../../components/Score';
import { StoreProvider, useStore } from '../../components/StoreContext';
import { useKeyboardActions } from './useKeyboardActions';
import { VSpace } from '../../components/Spacer';
import { useGameLoop } from '../../lib/useGameLoop';

export const GamePage: React.FC = observer(() => {
  const store = useStore();
  useLocalStore(() => {
    store.game.readyGameForPlay();
    return {};
  });

  useGameLoop();
  useKeyboardActions();

  return (
    <StoreProvider value={store}>
      <GridLayout>
        <div>
          <Row justify="center">
            <Score className="GamePage__Score" />
          </Row>
          <VSpace size="small" />
        </div>
        <div>{/* Empty */}</div>
        <div>
          <Board className="GamePage__Board">
            <MazeView />
            <PillsView />
            <PacManView />
            <GhostsGameView />
            <GameOver />
          </Board>
          <VSpace size="large" />
          <Row justify="center">
            <ExtraLives className="GamePage__LivesLeft" />
          </Row>
        </div>
        <div style={{ width: 'auto' }}>
          <DebugView />
        </div>
      </GridLayout>
    </StoreProvider>
  );
});

const GridLayout = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`;
