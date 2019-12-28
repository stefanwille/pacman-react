import React, { useEffect, useState, useCallback, FC } from "react";
import { Ghost } from "../../components/Ghost";
import { observer } from "mobx-react-lite";
import { Sprite } from "../../components/Sprite";
import { GameStore, GhostStore } from "../../lib/Store";
import { PacMan } from "../../components/PacMac";
import { onTimeElapsed } from "../../lib/onTimeElapsed";

const PacManView: FC<{ store: GameStore }> = observer(({ store }) => {
  return (
    <PacMan
      direction={store.pacMan.direction}
      phase={store.pacMan.phase}
      x={store.pacMan.x}
      y={store.pacMan.y}
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
  const [store] = useState(() => new GameStore());

  const animationStep = (timestamp: number) => {
    onTimeElapsed({ store, timestamp });
    if (store.gameRunning) {
      window.requestAnimationFrame(animationStep);
    }
  };

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

  useEffect(() => {
    window.requestAnimationFrame(animationStep);
    return store.stopGame;
  }, []);
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
