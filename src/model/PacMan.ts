import { observable, action, computed } from 'mobx';

import { Direction, MilliSeconds } from './Types';
import {
  tileFromScreen,
  screenFromTile,
  TileCoordinates,
  ScreenCoordinates,
  assertValidTileCoordinates,
} from './Coordinates';
import {
  makePacManStateChart,
  PacManEventType,
  INITIAL_PACMAN_STATE,
  PacManState,
} from './PacManStateChart';
import { Game } from './Game';
import { StateValue } from 'xstate';

export class PacMan {
  constructor(game: Game) {
    this.game = game;

    this.stateChart.onTransition(this.handleTransition);
    this.stateChart.start();
  }

  @action.bound
  handleTransition(state: PacManState) {
    if (!state.changed) {
      return;
    }
    this.stateChartState = state;
  }

  game: Game;

  stateChart = makePacManStateChart({
    onChasing: this.onChasing,
    onDead: this.onDead,
  });

  @observable.ref
  stateChartState: PacManState = this.stateChart.state;

  @action.bound
  onChasing() {
    this.game.energizerTimer.start();
  }

  @action.bound
  onDead() {
    this.diedAtTimestamp = this.game.timestamp;
  }

  @computed
  get dead(): boolean {
    return this.stateChartState.matches('dead');
  }

  @computed
  get state(): StateValue {
    return this.stateChartState.value;
  }

  send(event: PacManEventType) {
    this.stateChart.send(event);
  }

  @computed
  get alive() {
    return !this.dead;
  }

  @observable
  screenCoordinates: ScreenCoordinates = screenFromTile({ x: 1, y: 1 });

  @action
  setTileCoordinates(tile: TileCoordinates) {
    assertValidTileCoordinates(tile);
    this.screenCoordinates = screenFromTile(tile);
  }

  @computed
  get tileCoordinates(): TileCoordinates {
    return tileFromScreen(this.screenCoordinates);
  }

  @observable
  diedAtTimestamp: MilliSeconds = -1;

  @computed
  get timeSinceDeath(): MilliSeconds {
    if (this.alive) {
      return 0;
    }
    return this.game.timestamp - this.diedAtTimestamp;
  }

  @observable
  extraLivesLeft = 2;

  @observable
  direction: Direction = 'RIGHT';
  nextDirection: Direction = 'RIGHT';
}

export const resetPacMan = (pacMan: PacMan) => {
  pacMan.diedAtTimestamp = -1;
  pacMan.stateChart.state.value = INITIAL_PACMAN_STATE;
  pacMan.setTileCoordinates({ x: 14, y: 23 });
  pacMan.nextDirection = 'LEFT';
  pacMan.direction = 'LEFT';
};
