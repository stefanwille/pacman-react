import { observable, action, computed } from 'mobx';

import { Direction } from '../components/Types';
import { PacManPhase } from '../components/PacMacView';
import { screenFromTileCoordinate } from './Coordinates';
import { makePacManStateChart } from './PacManStateChart';

export type DyingPacManPhase =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export const DyingPacManPhases: DyingPacManPhase[] = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
];

export class PacMan {
  constructor() {
    this.stateChart.onTransition(state => {
      if (!state.changed) {
        return;
      }
      this.setState(this.stateChart.state.value as string);
    });
    this.stateChart.start();
  }

  stateChart = makePacManStateChart({
    onDead: this.onDead,
  });

  @action.bound
  onDead() {
    this.diedAtTimestamp = this.timestamp;
  }

  @observable
  state = this.stateChart.state.value;

  @action
  setState(state: string) {
    this.state = state;
  }

  send(event: string) {
    this.stateChart.send(event);
  }

  @observable
  timestamp = 0;

  @observable
  x = screenFromTileCoordinate(1);

  @observable
  y = screenFromTileCoordinate(1);

  @computed
  get phase(): PacManPhase {
    const step = Math.round(this.timestamp / 200) % 4;
    const phase = step === 3 ? 1 : step;
    return phase as PacManPhase;
  }

  @observable
  diedAtTimestamp = 0;

  @computed
  get dyingPhase(): DyingPacManPhase {
    const deadMilliSeconds = this.timestamp - this.diedAtTimestamp;
    let dyingPhase: number = Math.floor(deadMilliSeconds / 200);
    if (dyingPhase >= DyingPacManPhases.length) {
      dyingPhase = DyingPacManPhases.length - 1;
    }
    return dyingPhase as DyingPacManPhase;
  }

  @observable
  direction: Direction = 'RIGHT';
  nextDirection: Direction = 'RIGHT';

  @action.bound
  setPressedKey(pressedKey: string) {
    if (pressedKey === 'ArrowLeft') {
      this.nextDirection = 'LEFT';
    } else if (pressedKey === 'ArrowRight') {
      this.nextDirection = 'RIGHT';
    } else if (pressedKey === 'ArrowUp') {
      this.nextDirection = 'UP';
    } else if (pressedKey === 'ArrowDown') {
      this.nextDirection = 'DOWN';
    }
  }
}
