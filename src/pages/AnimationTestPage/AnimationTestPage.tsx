import React, { useEffect, useState, useCallback, FC } from "react";
import { Ghost } from "../../components/Ghost";
import { observer } from "mobx-react-lite";
import { Sprite } from "../../components/Sprite";
import { GameStore, GhostStore } from "../../lib/Store";
import { PacMan } from "../../components/PacMac";
import { useGameLoop } from "../../lib/useGameLoop";
import { setTileCoordinates } from "../../lib/MazeObject";
import { TILE_SIZE } from "../../lib/Coordinates";

const PAC_MAN_WIDTH = TILE_SIZE * 2;
const PAC_MAN_HEIGHT = TILE_SIZE * 2;

const PAC_MAN_OFFSET_X = PAC_MAN_WIDTH / 2 - 2;
const PAC_MAN_OFFSET_Y = PAC_MAN_HEIGHT / 2 - 12;

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

const GhostView: FC<{ store: GameStore; ghostNumber: number }> = observer(
  ({ store, ghostNumber }) => {
    const ghostStore: GhostStore = store.ghosts[ghostNumber];
    return (
      <Ghost
        direction={ghostStore.direction}
        phase={ghostStore.phase}
        x={ghostStore.x}
        y={ghostStore.y}
        ghostNumber={ghostStore.ghostNumber}
      />
    );
  }
);

export const AnimationTestPage: React.FC = observer(() => {
  const [store] = useState(() => {
    const store = new GameStore();
    setTileCoordinates({ store: store.pacMan, tx: 1, ty: 1 });
    return store;
  });
  useGameLoop(store);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    store.pacMan.setPressedKey(event.key);
  }, []);

  const onKeyUp = useCallback(() => {
    store.pacMan.setPressedKey("");
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  return (
    <div>
      <Sprite className="Sprite-maze" name="maze-state-full" x={0} y={10} />

      <PacManView store={store} />

      {store.ghosts.map((_, index: number) => (
        <GhostView store={store} ghostNumber={index} key={index} />
      ))}
    </div>
  );
});
