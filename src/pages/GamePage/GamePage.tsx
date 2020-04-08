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
import { useGameLoop } from '../../lib/useGameLoop';
import { useKeyboardActions } from './useKeyboardActions';
import { VSpace } from '../../components/Spacer';

export const GamePage: React.FC = observer(() => {
  const store = useStore();
  useLocalStore(() => {
    store.game.readyGameForPlay();
    return {};
  });

  useGameLoop(store);
  useKeyboardActions(store);

  return (
    <StoreProvider value={store}>
      <Layout>
        <Row gutter={8} justify="space-around">
          <Col flex="0 0 560px">
            <BoardRow align="middle" justify="center">
              <Score className="GamePage__Score" />
            </BoardRow>
            <VSpace size="medium" />
            <Board className="GamePage__Board">
              <MazeView />
              <PillsView />
              <PacManView />
              <GhostsGameView />
              <GameOver />
            </Board>
            <VSpace size="large" />
            <BoardRow align="middle" justify="center">
              <ExtraLives className="GamePage__LivesLeft" />
            </BoardRow>
            <VSpace size="large" />
          </Col>
          <Col flex="0 0 auto">
            <DebugView />
          </Col>
        </Row>
      </Layout>
    </StoreProvider>
  );
});

const Layout = styled.div`
  margin-left: 32px;
  margin-right: 32px;
  .GamePage__Board {
  }

  .GamePage__LivesLeft {
  }
`;

const BoardRow = styled(Row)`
  width: 560px;
`;
