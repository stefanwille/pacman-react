import { observable, action, computed } from 'mobx';

import { Direction } from '../components/Types';
import { PacManPhase } from '../components/PacMacView';
import { screenFromTileCoordinate } from './Coordinates';
import { PacManStateChart } from './PacManStateChart';
import { interpret } from 'xstate';

export type DyingPacManPhase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

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
];

export class PacMan {
  constructor() {
    this.stateChart.start();
  }

  stateChart = interpret(PacManStateChart);

  @computed
  get state() {
    return this.stateChart.state.value;
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
    let dyingPhase: number = Math.round(deadMilliSeconds / 200);
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
