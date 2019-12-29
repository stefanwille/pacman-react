import { observable, computed } from "mobx";

import { GhostPhase } from "../components/Ghost";
import { Direction, SPEED } from "../components/Types";

export class GhostStore {
  @observable
  timestamp = 0;

  ghostNumber = 0;

  color = "ghost color";

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
}
