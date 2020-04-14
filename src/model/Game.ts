import { action, computed, configure, observable } from 'mobx';
import { Ghost } from './Ghost';
import { makeGhosts, resetGhosts } from './makeGhosts';
import { Maze } from './Maze';
import {
  PacMan,
  resetPacMan,
  TOTAL_DYING_PAC_ANIMATION_LENGTH,
} from './PacMan';
import { MilliSeconds, PixelsPerFrame } from './Types';
import { Store } from './Store';
import { TimeoutTimer } from './TimeoutTimer';

configure({ enforceActions: 'observed' });

export const TOTAL_TIME_TO_GAME_OVER_MESSAGE = TOTAL_DYING_PAC_ANIMATION_LENGTH;

export const DEFAULT_SPEED = 2;

// TODO: Revert
const ENERGIZER_DURATION: MilliSeconds = 5000;
// const ENERGIZER_DURATION: MilliSeconds = 5000000;

export class Game {
  constructor(store: Store) {
    this.store = store;
    this.pacMan = new PacMan(this);
    this.ghosts = makeGhosts(this);
  }

  store: Store;

  @observable
  timestamp: MilliSeconds = 0;

  @observable
  previousTimestamp: MilliSeconds = 0;

  @computed
  get timeSinceLastFrame(): MilliSeconds {
    return this.timestamp - this.previousTimestamp;
  }

  @observable
  roundRuntime: MilliSeconds = 0;

  @action
  resetRoundRuntime() {
    this.roundRuntime = 0;
  }

  @observable
  frameCount = 0;

  @observable
  gamePaused = false;

  @action
  setGamePaused(gamePaused: boolean) {
    this.gamePaused = gamePaused;
    if (!gamePaused) {
      this.resetTimeMeasurement();
    }
  }

  @action
  resetTimeMeasurement() {
    this.previousTimestamp = 0;
  }

  @action.bound
  toggleGamePaused() {
    this.gamePaused = !this.gamePaused;
  }

  speed: PixelsPerFrame = DEFAULT_SPEED;

  ghosts: Ghost[];

  pacMan: PacMan;

  @observable
  score = 0;

  @observable
  killedGhosts = 0;

  maze = new Maze();

  @action.bound
  revivePacMan() {
    this.pacMan.send('REVIVED');
    this.resetRoundRuntime();
    resetPacMan(this.pacMan);

    resetGhosts(this.ghosts);
  }

  @computed
  get gameOver(): boolean {
    const pacMan = this.pacMan;
    return pacMan.dead && pacMan.extraLivesLeft === 0;
  }

  @computed
  get gameOverMessageVisible(): boolean {
    const pacMan = this.pacMan;
    return (
      this.gameOver && pacMan.timeSinceDeath >= TOTAL_TIME_TO_GAME_OVER_MESSAGE
    );
  }

  energizerTimer = new TimeoutTimer(
    ENERGIZER_DURATION,
    this.handleEnergizerTimedOut
  );

  @action.bound
  handleEnergizerTimedOut() {
    this.pacMan.send('ENERGIZER_TIMED_OUT');
    for (const ghost of this.ghosts) {
      ghost.send('ENERGIZER_TIMED_OUT');
    }
  }

  readyGameForPlay() {
    resetPacMan(this.pacMan);
    this.ghosts[0].ghostPaused = false;
    this.ghosts[1].ghostPaused = false;
    this.ghosts[2].ghostPaused = false;
    this.ghosts[3].ghostPaused = false;
  }
}