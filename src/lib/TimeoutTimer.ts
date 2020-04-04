import { MilliSeconds } from './Types';

export type TimeoutTimerCallback = () => void;

export class TimeoutTimer {
  readonly time: MilliSeconds;
  running: boolean;
  timeLeft: MilliSeconds;
  readonly onTimedOut: TimeoutTimerCallback;

  constructor(time: MilliSeconds, onTimedOut: TimeoutTimerCallback) {
    this.time = time;
    this.onTimedOut = onTimedOut;
    this.running = false;
    this.timeLeft = time;
  }

  start() {
    this.running = true;
    this.timeLeft = this.time;
  }

  countDown(timePassed: MilliSeconds) {
    if (!this.running) {
      return;
    }
    this.timeLeft -= timePassed;
    if (this.isTimedOut) {
      this.onTimedOut();
      this.running = false;
    }
  }

  get isTimedOut() {
    return this.timeLeft <= 0;
  }
}
