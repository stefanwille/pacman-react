import { MilliSeconds } from './Types';
import { observable, computed, action } from 'mobx';

export type TimeoutTimerCallback = () => void;

export class TimeoutTimer {
  readonly time: MilliSeconds;
  readonly onTimedOut: TimeoutTimerCallback;

  @observable
  running: boolean;

  @observable
  timeSpent: MilliSeconds;

  constructor(time: MilliSeconds, onTimedOut: TimeoutTimerCallback) {
    this.time = time;
    this.onTimedOut = onTimedOut;
    this.running = false;
    this.timeSpent = 0;
  }

  @action.bound
  start() {
    this.running = true;
    this.timeSpent = 0;
  }

  @action
  advance(timePassed: MilliSeconds) {
    if (!this.running) {
      return;
    }
    this.timeSpent += timePassed;
    if (this.isTimedOut) {
      this.onTimedOut();
      this.stop();
    }
  }

  @action
  stop() {
    this.running = false;
  }

  @computed
  get timeLeft() {
    return this.time - this.timeSpent;
  }

  @computed
  get isTimedOut() {
    return this.timeSpent >= this.time;
  }
}
