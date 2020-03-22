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
import { PacManView } from '../../components/PacMacView';
import { PillsView } from '../../components/PillsView';
import { Score } from '../../components/Score';
import { StoreProvider, useStore } from '../../components/StoreContext';
import { useGameLoop } from '../../lib/useGameLoop';
import { useKeyboardActions } from './useKeyboardActions';

const Layout = styled.div`
  .GamePage__Board {
    margin-bottom: 30px;
  }

  .GamePage__Score {
    margin-right: 70px;
  }

  .GamePage__LivesLeft {
    margin-right: 70px;
  }
`;

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
        <Row>
          <Col span={12}>
            <main>
              <Board className="GamePage__Board">
                <MazeView />
                <PillsView />
                <PacManView />
                <GhostsGameView />
                <GameOver />
              </Board>
            </main>
          </Col>
          <Col span={12}>
            <aside>
              <DebugView />
            </aside>
          </Col>{' '}
        </Row>
        <footer>
          <Score className="GamePage__Score" />
          <ExtraLives className="GamePage__LivesLeft" />
        </footer>
      </Layout>
    </StoreProvider>
  );
});
