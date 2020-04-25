import { action, computed, observable } from 'mobx';
import { changeDirectionToOpposite } from './changeDirectionToOpposite';
import {
  ScreenCoordinates,
  screenFromTile,
  TileCoordinates,
  tileFromScreen,
} from './Coordinates';
import { findWayPoints } from './findWayPoints';
import { Game } from './Game';
import {
  GhostEventType,
  makeGhostStateChart,
  GhostState,
} from './GhostStateChart';
import { Direction, MilliSeconds } from './Types';
import {
  isTileInBox as isTileInBoxWalls,
  isTileCenter,
  isTileInBoxSpace,
} from './Ways';
import { StateValue } from 'xstate';
import { TimeoutTimer } from './TimeoutTimer';
import { getStatePhaseLength } from './updateGhostStatePhase';

export type GhostNumber = 0 | 1 | 2 | 3;
export const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];
export type GhostAnimationPhase = 0 | 1;
export const GhostAnimationPhases: GhostAnimationPhase[] = [0, 1];
export type FrightenedGhostTime = 0 | 1;
export const FrightenedGhostTimes: FrightenedGhostTime[] = [0, 1];

const FRIGHTENED_ABOUT_TO_END_DURATION: MilliSeconds = 3000;
const DEAD_WAITING_IN_BOX_DURATION: MilliSeconds = 3000;

export const KILL_GHOST_SCORE = [0, 100, 200, 400, 800, 1600, 3200];

export class Ghost {
  constructor(game: Game) {
    this.game = game;

    this.stateChart.onTransition(this.handleStateTransition);
    this.stateChart.start();
  }

  @action.bound
  handleStateTransition(state: GhostState) {
    if (!state.changed) {
      return;
    }
    this.stateChartState = state;
    this.stateChanges++;
  }

  stateChart = makeGhostStateChart({
    onScatterToChase: this.onScatterToChase,
    onChaseToScatter: this.onChaseToScatter,
    onDead: this.onDead,
  });

  @action.bound
  onDead() {
    this.game.killedGhosts++;
    this.game.score += KILL_GHOST_SCORE[this.game.killedGhosts];
    this.deadWaitingTimeInBoxLeft = DEAD_WAITING_IN_BOX_DURATION;
  }

  @action.bound
  onScatterToChase() {
    changeDirectionToOpposite(this);
  }

  @action.bound
  onChaseToScatter() {
    changeDirectionToOpposite(this);
  }

  @observable.ref
  stateChartState: GhostState = this.stateChart.state;

  @computed
  get state(): StateValue {
    return this.stateChartState.value;
  }

  @observable
  stateChanges = 0;

  @computed
  get dead() {
    return this.stateChartState.matches('dead');
  }

  @computed
  get alive() {
    return !this.dead;
  }

  @computed get frightened(): boolean {
    return this.stateChartState.matches('frightened');
  }

  name = 'ghost name';

  send(event: GhostEventType) {
    this.stateChart.send(event);
  }

  @observable
  ghostPaused = true;

  game: Game;

  @observable
  ghostNumber: GhostNumber = 0;

  color = 'ghost color';
  colorCode = '#00ffff';

  @observable
  screenCoordinates: ScreenCoordinates = {
    x: 16,
    y: 16,
  };

  @computed
  get atTileCenter(): boolean {
    return isTileCenter(this.screenCoordinates);
  }

  @observable
  speedFactor = 1;

  @action
  setTileCoordinates(tile: TileCoordinates) {
    this.screenCoordinates = screenFromTile(tile);
  }

  @computed
  get tileCoordinates(): TileCoordinates {
    return tileFromScreen(this.screenCoordinates);
  }

  @computed
  get animationPhase(): GhostAnimationPhase {
    return Math.round((this.game.timestamp + this.ghostNumber * 100) / 300) %
      2 ===
      0
      ? 0
      : 1;
  }

  @computed
  get frightenedAboutToEnd(): boolean {
    return this.game.energizerTimer.timeLeft < FRIGHTENED_ABOUT_TO_END_DURATION;
  }

  @observable
  deadWaitingTimeInBoxLeft: MilliSeconds = 0;

  @computed
  get frightenedGhostTime(): FrightenedGhostTime {
    if (!this.frightenedAboutToEnd) {
      return 0;
    }
    // Blink every 0.5 seconds
    return this.game.timestamp % 1000 < 500 ? 0 : 1;
  }

  @observable
  direction: Direction = 'LEFT';

  @observable
  targetTile: TileCoordinates = { x: 1, y: 1 };

  @computed
  get wayPoints(): TileCoordinates[] | null {
    return findWayPoints(
      this.tileCoordinates,
      this.targetTile,
      this.direction,
      this.canPassThroughBoxDoor
    );
  }

  statePhaseTimer = new TimeoutTimer(3000);

  @computed
  get isInsideBoxWalls(): boolean {
    return isTileInBoxWalls(this.tileCoordinates);
  }

  @computed
  get isOutsideBoxSpace() {
    return !isTileInBoxSpace(this.tileCoordinates);
  }

  @computed
  get canPassThroughBoxDoor(): boolean {
    if (this.alive) {
      if (this.isInsideBoxWalls) {
        if (this.game.timestamp > this.initialWaitingTimeInBox) {
          return true;
        }
      }
    }

    if (this.dead) {
      if (this.isOutsideBoxSpace) {
        return true;
      }

      // Dead && Inside box
      if (this.deadWaitingTimeInBoxLeft <= 0) {
        return true;
      }
    }

    return false;
  }

  @action
  resetGhost() {
    this.ghostPaused = false;
    this.send('RESET');
    this.statePhaseTimer.setDuration(getStatePhaseLength(this.state));
    this.statePhaseTimer.restart();
  }

  initialWaitingTimeInBox = 0;
}
