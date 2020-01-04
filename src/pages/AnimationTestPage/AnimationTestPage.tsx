/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback, FC, Fragment } from 'react';
import { GhostsView } from '../../components/Ghost';
import { observer } from 'mobx-react-lite';
import { Sprite } from '../../components/Sprite';
import { PacManView } from '../../components/PacMac';
import { useGameLoop } from '../../lib/useGameLoop';
import {
  screenFromTile,
  screenFromTileCoordinate,
} from '../../lib/Coordinates';
import {
  MAZE_HEIGHT_IN_TILES,
  MAZE_WIDTH_IN_TILES,
  BASIC_PILL_ID,
  ENERGIZER_ID,
} from '../../lib/MazeData';
import { getPillHitBox } from '../../lib/onTimeElapsed';
import { useStore, StoreContext } from '../../lib/StoreContext';
import { action } from 'mobx';
import { Box } from '../../components/Box';
import { GameStore } from '../../lib/GameStore';

const MazeView: FC<{}> = () => (
  <Sprite className="Sprite-maze" name="maze-state-empty" x={0} y={0} />
);

const BasicPillView: FC<{ x: number; y: number }> = ({ x, y }) => (
  <Sprite x={x - 10} y={y - 10} name="basic-pill" />
);

const EnergizerView: FC<{ x: number; y: number }> = ({ x, y }) => (
  <Sprite x={x - 10} y={y - 10} name="energizer" />
);

export const BasicPillHitBox: FC<{}> = () => {
  const rect = getPillHitBox(1, 3, BASIC_PILL_ID);
  return <Box rect={rect} color="blue" />;
};

const PillsView: FC<{}> = observer(() => {
  const store = useStore();
  const views = [];
  for (let ty = 0; ty < MAZE_HEIGHT_IN_TILES; ty++) {
    for (let tx = 0; tx < MAZE_WIDTH_IN_TILES; tx++) {
      const tileId = store.pills[ty][tx];
      if (tileId === BASIC_PILL_ID) {
        views.push(
          <BasicPillView
            key={`${tx}/${ty}`}
            x={screenFromTileCoordinate(tx)}
            y={screenFromTileCoordinate(ty)}
          />
        );
      }
      if (tileId === ENERGIZER_ID) {
        views.push(
          <EnergizerView
            key={`${tx}/${ty}`}
            x={screenFromTileCoordinate(tx)}
            y={screenFromTileCoordinate(ty)}
          />
        );
      }
    }
  }
  return <Fragment>{views}</Fragment>;
});

const FPS: FC<{}> = observer(() => {
  const store = useStore();
  return <p>{Math.round(1000 / store.timeBetweenTicks)} FPS</p>;
});

const useKeyboard = (store: GameStore) => {
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    store.pacMan.setPressedKey(event.key);
  }, []);

  const onKeyUp = useCallback(() => {
    store.pacMan.setPressedKey('');
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  });
};

export const AnimationTestPage: React.FC = observer(() => {
  const store = useStore();
  useGameLoop(store);
  useEffect(
    action(() => {
      [store.pacMan.x, store.pacMan.y] = screenFromTile(1, 1);
    }),
    []
  );

  useKeyboard(store);

  return (
    <StoreContext.Provider value={store}>
      <div className="Game">
        <div className="Board">
          <MazeView />
          <PillsView />
          <PacManView />
          <GhostsView />
        </div>
        <br />
        <br />
        <div className="Footer">
          <FPS />
          <a onClick={store.toggleGamePaused}>
            {store.gamePaused ? 'Run' : 'Pause'}
          </a>
        </div>
      </div>
    </StoreContext.Provider>
  );
});
