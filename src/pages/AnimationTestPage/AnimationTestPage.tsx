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

  minX = 16;
  maxX = 17 * 16;

  @observable
  y = 16;

  minY = 16;
  maxY = 17 * 16;

  @observable
  vx = SPEED;

  @observable
  vy = 0;

  @computed
  get phase(): GhostPhase {
    return Math.round((this.timestamp + this.ghostNumber * 100) / 300) % 2 === 0
      ? 0
      : 1;
  }

  @computed
  get direction(): Direction {
    if (this.vx > 0) {
      return "RIGHT";
    }
    if (this.vx < 0) {
      return "LEFT";
    }
    if (this.vy > 0) {
      return "DOWN";
    }
    return "UP";
  }

  @action.bound
  update(timestamp: number) {
    this.timestamp = timestamp;

    this.x += this.vx;
    if (this.x > this.maxX) {
      this.x = this.maxX;
      this.vx = -1 * this.vx;
    }
    if (this.x <= this.minX) {
      this.x = this.minX;
      this.vx = -1 * this.vx;
    }

    this.y += this.vy;
    if (this.y > this.maxY) {
      this.y = this.maxY;
      this.vy = -1 * this.vy;
    }
    if (this.y <= this.minY) {
      this.y = this.minY;
      this.vy = -1 * this.vy;
    }
  }
}

class GameStore {
  constructor() {
    this.ghosts[0].ghostNumber = 0;
    this.ghosts[0].x = 200;
    this.ghosts[0].y = 30 * 16;
    this.ghosts[0].vx = SPEED;
    this.ghosts[0].vy = 0;
    this.ghosts[0].minY = 20;
    this.ghosts[0].maxY = 1000;

    this.ghosts[1].ghostNumber = 1;
    this.ghosts[1].x = 50;
    this.ghosts[1].y = 25;
    this.ghosts[1].vx = SPEED;
    this.ghosts[1].vy = 0;

    this.ghosts[2].ghostNumber = 2;
    this.ghosts[2].maxX = 800;
    this.ghosts[2].minX = 16;
    this.ghosts[2].minY = 20;
    this.ghosts[2].maxY = 39 * 16;
    this.ghosts[2].x = 31 * 16;
    this.ghosts[2].y = 25 * 16;
    this.ghosts[2].vx = 0;
    this.ghosts[2].vy = SPEED;
  }

  @observable
  gameRunning = true;

  ghosts = [new GhostStore(), new GhostStore(), new GhostStore()];

  @action.bound
  update(timestamp: number) {
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
