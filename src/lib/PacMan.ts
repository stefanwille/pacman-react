import { observable, action, computed } from 'mobx';

import { Direction, MilliSeconds } from './Types';
import { PacManPhase } from '../components/PacMacView';
import {
  tileFromScreen,
  screenFromTile,
  TileCoordinates,
  ScreenCoordinates,
  assertValidTileCoordinates,
  MAZE_WIDTH_IN_SCREEN_COORDINATES,
} from './Coordinates';
import {
  makePacManStateChart,
  PacManEventType,
  INITIAL_PACMAN_STATE,
} from './PacManStateChart';
import { Game } from './Game';

export type DyingPacManPhase = number;
export const DyingPacManPhaseCount = 13;
export const DyingPacManPhases: DyingPacManPhase[] = Array.from(
  Array(DyingPacManPhaseCount).keys()
);
export const DYING_PAC_PHASE_LENGTH: MilliSeconds = 200;
export const TOTAL_DYING_PAC_ANIMATION_LENGTH: MilliSeconds =
  DYING_PAC_PHASE_LENGTH * DyingPacManPhaseCount;

export class PacMan {
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

  game: Game;

  stateChart = makePacManStateChart({
    onChasing: this.onChasing,
    onDead: this.onDead,
  });

  @action.bound
  onChasing() {
    this.game.startEnergizer();
  }

  @action.bound
  onDead() {
    this.diedAtTimestamp = this.game.timestamp;
  }

  @computed
  get dead(): boolean {
    return this.diedAtTimestamp > this.game.timestamp;
  }

  @observable
  state = this.stateChart.state.value;

  @action
  setState(state: string) {
    this.state = state;
  }

  send(event: PacManEventType) {
    this.stateChart.send(event);
  }

  @computed
  get alive() {
    return this.state !== 'dead';
  }

  @observable
  screenCoordinates: ScreenCoordinates = screenFromTile({ x: 1, y: 1 });

  @action setScreenCoordinates(screen: ScreenCoordinates) {
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
    assertValidTileCoordinates(tile);
    this.screenCoordinates = screenFromTile(tile);
  }

  @computed
  get tileCoordinates(): TileCoordinates {
    return tileFromScreen(this.screenCoordinates);
  }

  @computed
  get phase(): PacManPhase {
    const step = Math.round(this.game.timestamp / 200) % 4;
    const phase = step === 3 ? 1 : step;
    return phase as PacManPhase;
  }

  @observable
  diedAtTimestamp: MilliSeconds = 0;

  @computed
  get timeSinceDeath(): MilliSeconds {
    if (this.diedAtTimestamp === 0) {
      return 0;
    }
    return this.game.timestamp - this.diedAtTimestamp;
  }

  @observable
  extraLivesLeft = 2;

  @computed
  get dyingPhase(): DyingPacManPhase {
    let dyingPhase: number = Math.floor(
      this.timeSinceDeath / DYING_PAC_PHASE_LENGTH
    );
    if (dyingPhase >= DyingPacManPhaseCount) {
      dyingPhase = DyingPacManPhaseCount - 1;
    }
    return dyingPhase as DyingPacManPhase;
  }

  @observable
  direction: Direction = 'RIGHT';
  nextDirection: Direction = 'RIGHT';

  @action.bound
  setNextDirection(nextDirection: Direction) {
    this.nextDirection = nextDirection;
  }
}

export const resetPacMan = (pacMan: PacMan) => {
  pacMan.diedAtTimestamp = 0;
  pacMan.stateChart.state.value = INITIAL_PACMAN_STATE;
  pacMan.setTileCoordinates({ x: 14, y: 23 });
  pacMan.nextDirection = 'LEFT';
  pacMan.direction = 'LEFT';
};
