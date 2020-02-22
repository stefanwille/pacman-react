import { observable, computed, action } from 'mobx';

import { GhostPhase } from '../components/GhostsView';
import { Direction } from '../components/Types';
import {
  screenFromTile,
  TileCoordinates,
  tileFromScreen,
  ScreenCoordinates,
} from './Coordinates';
import { makeGhostStateChart } from './GhostStateChart';
import { Game } from './Game';

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
    onDead: this.onDead,
  });

  @action.bound
  onDead() {}

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
  ghostPaused = true;

  game: Game;

  @observable
  timestamp = 0;

  ghostNumber = 0;

  color = 'ghost color';

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
    this.screenCoordinates.x += delta.x;
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
  get phase(): GhostPhase {
    return Math.round((this.timestamp + this.ghostNumber * 100) / 300) % 2 === 0
      ? 0
      : 1;
  }

  @observable
  direction: Direction = 'LEFT';

  @observable
  wayPoints: TileCoordinates[] | null = null;
}
