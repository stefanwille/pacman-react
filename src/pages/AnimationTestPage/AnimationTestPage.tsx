import React, { useState, useEffect } from "react";
import { Ghost, GhostPhase } from "../../components/Ghost";
import { useLocalStore, observer } from "mobx-react-lite";

const SPEED = 2;

export const AnimationTestPage: React.FC = observer(() => {
  const store = useLocalStore(() => ({
    x: 0,
    vx: SPEED,
    phase: 0,
    gameRunning: true,

    tick(timestamp: number) {
      store.x += store.vx;
      if (store.x > 200) {
        store.vx = -1 * SPEED;
      }
      if (store.x <= 0) {
        store.vx = 1 * SPEED;
      }
      store.phase = Math.round(timestamp / 300) % 2;
    }
  }));

  const animationStep = (timestamp: number) => {
    store.tick(timestamp);
    if (store.gameRunning) {
      window.requestAnimationFrame(animationStep);
    }
  };

  useEffect(() => {
    window.requestAnimationFrame(animationStep);
    return () => {
      store.gameRunning = false;
    };
  }, []);
  return (
    <div>
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
