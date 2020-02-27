import { action, computed, observable } from 'mobx';
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
import { makeGhostStateChart, GhostEventType } from './GhostStateChart';
import { Direction, MilliSeconds } from './Types';

export type GhostNumber = 0 | 1 | 2 | 3;
export const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];
export type GhostAnimationPhase = 0 | 1;
export const GhostAnimationPhases: GhostAnimationPhase[] = [0, 1];

export class Ghost {
  constructor(game: Game) {
    this.game = game;

    this.stateChart.onTransition(state => {
      if (!state.changed) {
        return;
      }
      this.setState(this.stateChart.state.value as string);
    });
    this.stateChart.start();
  }

  stateChart = makeGhostStateChart({
    onPacManKilled: this.onPacManKilled,
    onScatterToChase: this.onScatterToChase,
    onChaseToScatter: this.onChaseToScatter,
    onDead: this.onDead,
  });

  @action.bound
  onPacManKilled() {
    this.ghostPaused = true;
  }

  @action.bound
  onDead() {}

  @action.bound
  onScatterToChase() {
    changeDirectionToOpposite(this);
  }

  @action.bound
  onChaseToScatter() {
    changeDirectionToOpposite(this);
  }

  @observable
  state = this.stateChart.state.value;

  name = 'ghost name';

  @action
  setState(state: string) {
    this.state = state;
  }

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

  @observable
  direction: Direction = 'LEFT';

  @observable
  targetTile: TileCoordinates = { x: 1, y: 1 };

  @computed
  get wayPoints(): TileCoordinates[] | null {
    return findWayPoints(this.tileCoordinates, this.targetTile, this.direction);
  }

  @observable
  phaseTime: MilliSeconds = 0;
}
