/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback, FC } from 'react';
import { GhostsView } from '../../components/Ghost';
import { observer } from 'mobx-react-lite';
import { Sprite } from '../../components/Sprite';
import { PacManView } from '../../components/PacMac';
import { useGameLoop } from '../../lib/useGameLoop';
import { screenFromTile } from '../../lib/Coordinates';
import { useStore, StoreContext } from '../../lib/StoreContext';
import { action } from 'mobx';
import { GameStore } from '../../lib/GameStore';
import { PillsView } from '../../components/PillView';

const MazeView: FC<{}> = () => (
  <Sprite className="Sprite-maze" name="maze-state-empty" x={0} y={0} />
);

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
