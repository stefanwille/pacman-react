import React, { useEffect } from "react";
import { Ghost, GhostPhase } from "../../components/Ghost";
import { observer } from "mobx-react-lite";
import { observable, action, computed } from "mobx";
import { Sprite } from "../../components/Sprite";
import { Direction } from "../../components/Types";

const SPEED = 1.5;

class GhostStore {
  @observable
  timestamp = 0;

  ghostNumber = 0;

  @observable
  x = 16;

  @observable
  y = 16;

  @observable
  vx = SPEED;

  @computed
  get phase(): GhostPhase {
    return Math.round((this.timestamp + this.ghostNumber * 100) / 300) % 2 === 0
      ? 0
      : 1;
  }

  @computed
  get direction(): Direction {
    return this.vx > 0 ? "RIGHT" : "LEFT";
  }

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
}

class GameStore {
  constructor() {
    this.ghosts[0].ghostNumber = 0;
    this.ghosts[0].x = 200;
    this.ghosts[0].y = 480;
    this.ghosts[1].ghostNumber = 1;
    this.ghosts[1].y = 25;
  }

  @observable
  timestamp = 0;

  @observable
  gameRunning = true;

  ghosts = [new GhostStore(), new GhostStore()];

  @action.bound
  update(timestamp: number) {
    this.timestamp = timestamp;
    for (const ghost of this.ghosts) {
      ghost.update(timestamp);
    }
  }

  @action.bound
  stopGame() {
    this.gameRunning = false;
  }
}

const store = new GameStore();

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

      {store.ghosts.map((ghost: GhostStore, index: number) => (
        <Ghost
          key={index}
          direction={ghost.direction}
          phase={ghost.phase}
          x={ghost.x}
          y={ghost.y}
          ghostNumber={ghost.ghostNumber}
        />
      ))}
    </div>
  );
});
