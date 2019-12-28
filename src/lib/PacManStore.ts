import { observable, action, computed } from "mobx";

import { Direction } from "../components/Types";
import { PacManPhase } from "../components/PacMac";

export class PacManStore {
  @observable
  timestamp = 0;

  @observable
  x = 16;

  @observable
  y = 16;

  @computed
  get phase(): PacManPhase {
    const step = Math.round(this.timestamp / 300) % 4;
    const phase = step === 3 ? 1 : step;
    return phase as PacManPhase;
  }

  @observable
  direction: Direction = "RIGHT";

  @observable
  pressedKey = "";

  @action.bound
  setPressedKey(pressedKey: string) {
    this.pressedKey = pressedKey;

    if (pressedKey === "ArrowLeft") {
      this.direction = "LEFT";
    } else if (pressedKey === "ArrowRight") {
      this.direction = "RIGHT";
    } else if (pressedKey === "ArrowUp") {
      this.direction = "UP";
    } else if (pressedKey === "ArrowDown") {
      this.direction = "DOWN";
    } else this.direction = "RIGHT";
  }
}
