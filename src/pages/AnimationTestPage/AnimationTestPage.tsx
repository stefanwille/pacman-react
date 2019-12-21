import React, { useEffect } from "react";
import { Ghost, GhostPhase } from "../../components/Ghost";
import { useLocalStore, observer } from "mobx-react-lite";
import { Sprite } from "../../components/Sprite";

const SPEED = 1.5;

const useMyLocalStore = () => {
  const store = useLocalStore(() => ({
    x: 16,
    vx: SPEED,
    phase: 0,
    gameRunning: true,

    update(timestamp: number) {
      store.x += store.vx;
      if (store.x > 17 * 16) {
        store.vx = -1 * SPEED;
      }
      if (store.x <= 16) {
        store.vx = 1 * SPEED;
      }
      store.phase = Math.round(timestamp / 300) % 2;
    },

    stopGame() {
      store.gameRunning = false;
    }
  }));
  return store;
};

export const AnimationTestPage: React.FC = observer(() => {
  const store = useMyLocalStore();

  const animationStep = (timestamp: number) => {
    store.update(timestamp);
    if (store.gameRunning) {
      window.requestAnimationFrame(animationStep);
    }
  };

  useEffect(() => {
    window.requestAnimationFrame(animationStep);
    return store.stopGame;
  }, []);
  return (
    <div>
      <Sprite className="Sprite-maze" name="maze-state-full" x={0} y={10} />

      <Ghost
        key={0}
        direction={store.vx > 0 ? "RIGHT" : "LEFT"}
        phase={store.phase as GhostPhase}
        x={store.x}
        y={480}
        ghostNumber={0}
      />
    </div>
  );
});
