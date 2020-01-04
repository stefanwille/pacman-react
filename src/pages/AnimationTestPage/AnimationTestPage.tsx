/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback, FC, Fragment } from 'react';
import { Ghost } from '../../components/Ghost';
import { observer } from 'mobx-react-lite';
import { Sprite } from '../../components/Sprite';
import { GameStore } from '../../lib/GameStore';
import { GhostStore } from '../../lib/GhostStore';
import { PacMan } from '../../components/PacMac';
import { useGameLoop } from '../../lib/useGameLoop';
import {
  TILE_SIZE,
  screenFromTile,
  screenFromTileCoordinate,
} from '../../lib/Coordinates';
import {
  MAZE_HEIGHT_IN_TILES,
  MAZE_WIDTH_IN_TILES,
  BASIC_PILL_ID,
  ENERGIZER_ID,
} from '../../lib/MazeData';
import { Rectangle } from '../../lib/collisionDetection';
import {
  getPacManHitBox,
  getPillHitBox,
  getGhostHitBox,
} from '../../lib/onTimeElapsed';

const PAC_MAN_WIDTH = TILE_SIZE * 2;
const PAC_MAN_HEIGHT = TILE_SIZE * 2;

const PAC_MAN_OFFSET_X = PAC_MAN_WIDTH / 2 - 2;
const PAC_MAN_OFFSET_Y = PAC_MAN_HEIGHT / 2 - 2;

const MazeView: FC<{}> = () => (
  <Sprite className="Sprite-maze" name="maze-state-empty" x={0} y={0} />
);

const BasicPillView: FC<{ x: number; y: number }> = ({ x, y }) => (
  <Sprite x={x - 10} y={y - 10} name="basic-pill" />
);

const EnergizerView: FC<{ x: number; y: number }> = ({ x, y }) => (
  <Sprite x={x - 10} y={y - 10} name="energizer" />
);

const Box: FC<{ rect: Rectangle; color: string }> = ({ rect, color }) => (
  <div
    style={{
      position: 'absolute',
      left: rect.x,
      top: rect.y,
      width: rect.width,
      height: rect.height,
      backgroundColor: color,
    }}
  />
);

export const PacManHitBox: FC<{}> = () => {
  const rect = getPacManHitBox(
    screenFromTileCoordinate(1),
    screenFromTileCoordinate(1)
  );
  return <Box rect={rect} color="green" />;
};

export const GhostHitBox: FC<{}> = () => {
  const rect = getGhostHitBox(
    screenFromTileCoordinate(20),
    screenFromTileCoordinate(20)
  );
  return <Box rect={rect} color="pink" />;
};

export const BasicPillHitBox: FC<{}> = () => {
  const rect = getPillHitBox(1, 3, BASIC_PILL_ID);
  return <Box rect={rect} color="blue" />;
};

const PillsView: FC<{ store: GameStore }> = observer(({ store }) => {
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

const PacManView: FC<{ store: GameStore }> = observer(({ store }) => {
  return (
    <PacMan
      direction={store.pacMan.direction}
      phase={store.pacMan.phase}
      x={store.pacMan.x - PAC_MAN_OFFSET_X}
      y={store.pacMan.y - PAC_MAN_OFFSET_Y}
    />
  );
});

const GHOST_WIDTH = TILE_SIZE * 2;
const GHOST_HEIGHT = TILE_SIZE * 2;

const GHOST_OFFSET_X = GHOST_WIDTH / 2 - 3;
const GHOST_OFFSET_Y = GHOST_HEIGHT / 2;

const GhostView: FC<{ store: GameStore; ghostNumber: number }> = observer(
  ({ store, ghostNumber }) => {
    const ghostStore: GhostStore = store.ghosts[ghostNumber];
    return (
      <Ghost
        direction={ghostStore.direction}
        phase={ghostStore.phase}
        x={ghostStore.x - GHOST_OFFSET_X}
        y={ghostStore.y - GHOST_OFFSET_Y}
        ghostNumber={ghostStore.ghostNumber}
      />
    );
  }
);

const FPS: FC<{ store: GameStore }> = observer(({ store }) => (
  <p>{Math.round(1000 / store.timeBetweenTicks)} FPS</p>
));

export const AnimationTestPage: React.FC = observer(() => {
  const [store] = useState(() => {
    const store = new GameStore();
    [store.pacMan.x, store.pacMan.y] = screenFromTile(1, 1);
    return store;
  });
  useGameLoop(store);

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

  return (
    <div className="Game">
      <div className="Board">
        <MazeView />
        <PillsView store={store} />
        <PacManView store={store} />
        {store.ghosts.map((_, index: number) => (
          <GhostView store={store} ghostNumber={index} key={index} />
        ))}
      </div>
      <br />
      <br />
      <div className="Footer">
        <FPS store={store} />
        <a onClick={store.toggleGamePaused}>
          {store.gamePaused ? 'Run' : 'Pause'}
        </a>
      </div>
    </div>
  );
});
