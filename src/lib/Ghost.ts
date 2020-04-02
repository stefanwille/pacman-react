import { action, computed, observable } from 'mobx';
import { log } from '../util/log';
import { changeDirectionToOpposite } from './changeDirectionToOpposite';
import {
  MAZE_WIDTH_IN_SCREEN_COORDINATES,
  ScreenCoordinates,
  screenFromTile,
  TileCoordinates,
  tileFromScreen,
} from './Coordinates';
import { findWayPoints } from './findWayPoints';
import { Game } from './Game';
import { GhostEventType, makeGhostStateChart } from './GhostStateChart';
import { Direction, MilliSeconds } from './Types';
import { isTileInBox } from './Ways';

export type GhostNumber = 0 | 1 | 2 | 3;
export const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];
export type GhostAnimationPhase = 0 | 1;
export const GhostAnimationPhases: GhostAnimationPhase[] = [0, 1];
export type FrightenedGhostTime = 0 | 1;
export const FrightenedGhostTimes: FrightenedGhostTime[] = [0, 1];

const FRIGHTENED_ABOUT_TO_END_DURATION: MilliSeconds = 2000;

export const KILL_GHOST_SCORE = [0, 100, 200, 400, 800];

export class Ghost {
  constructor(game: Game) {
    this.game = game;

    this.stateChart.onTransition(this.handleStateTransition);
    this.stateChart.start();
  }

  @action.bound
  handleStateTransition(state: any) {
    if (!state.changed) {
      return;
    }
    this.state = this.stateChart.state.value as string;
    this.stateChanges++;
    log('Ghost', this.ghostNumber, 'entered state', this.state);
  }

  stateChart = makeGhostStateChart({
    onPacManKilled: this.onPacManKilled,
    onScatterToChase: this.onScatterToChase,
    onChaseToScatter: this.onChaseToScatter,
    onDead: this.onDead,
  });

  @action.bound
  onPacManKilled() {
    for (const ghost of this.game.ghosts) {
      ghost.ghostPaused = true;
    }
  }

  @action.bound
  onDead() {
    this.ghostPaused = true;
    this.game.killedGhosts++;
    this.game.score += KILL_GHOST_SCORE[this.game.killedGhosts];
  }

  @action.bound
  onScatterToChase() {
    changeDirectionToOpposite(this);
  }

  @action.bound
  onChaseToScatter() {
    changeDirectionToOpposite(this);
  }

  @observable
  state: string = this.stateChart.state.value as string;

  @observable
  stateChanges = 0;

  @computed
  get dead() {
    return this.state === 'dead';
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

  @action
  setScreenCoordinates(screen: ScreenCoordinates) {
    this.screenCoordinates = screen;
  }

  @action
  moveBy(delta: ScreenCoordinates) {
    this.screenCoordinates.x =
      (this.screenCoordinates.x + delta.x + MAZE_WIDTH_IN_SCREEN_COORDINATES) %
      MAZE_WIDTH_IN_SCREEN_COORDINATES;
    this.screenCoordinates.y += delta.y;
  }

  @action
  setTileCoordinates(tile: TileCoordinates) {
    this.setScreenCoordinates(screenFromTile(tile));
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
    return this.game.timeToEnergizerEnd < FRIGHTENED_ABOUT_TO_END_DURATION;
  }

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

  @observable
  phaseTime: MilliSeconds = 0;

  @computed
  get isInBox(): boolean {
    return isTileInBox(this.tileCoordinates);
  }

  @computed
  get canPassThroughBoxDoor(): boolean {
    return this.isInBox;
  }

  @action
  resetGhost() {
    this.ghostPaused = false;
    this.send('RESET');
    this.phaseTime = 0;
  }
}
