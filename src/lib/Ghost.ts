import { observable, computed, action } from 'mobx';

import { GhostPhase } from '../components/GhostsView';
import { Direction } from '../components/Types';
import { GameInterface } from './GameInterface';
import {
  screenFromTile,
  TileCoordinates,
  tileFromScreen,
  ScreenCoordinates,
} from './Coordinates';

/*

State:

Chase,
Scatter,
Frightened

*/

export class Ghost {
  constructor(game: GameInterface) {
    this.game = game;
  }

  @observable
  ghostPaused = true;

  game: GameInterface;

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
