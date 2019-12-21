import React, { useEffect } from "react";
import { Ghost, GhostPhase } from "../../components/Ghost";
import { observer } from "mobx-react-lite";
import { observable, action, computed } from "mobx";
import { Sprite } from "../../components/Sprite";

const SPEED = 1.5;

class GhostStore {
  @observable
  timestamp = 0;

  @observable
  x = 16;

  @observable
  vx = SPEED;

  @computed
  get phase(): number {
    return Math.round(this.timestamp / 300) % 2;
  }

  @observable
  gameRunning = true;

  @action.bound
  update(timestamp: number) {
    this.timestamp = timestamp;

    this.x += this.vx;
    if (this.x > 17 * 16) {
      this.vx = -1 * SPEED;
    }
    if (this.x <= 16) {
      this.vx = 1 * SPEED;
    }
  }

  @action.bound
  stopGame() {
    this.gameRunning = false;
  }
}

const store = new GhostStore();

export const AnimationTestPage: React.FC = observer(() => {
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
