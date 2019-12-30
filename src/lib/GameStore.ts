import { configure, observable, action, computed } from "mobx";

import { PacManStore } from "./PacManStore";
import { GhostStore } from "./GhostStore";
import {
  screenFromTileCoordinate,
  screenFromTileCoordinates,
} from "./Coordinates";
import { SPEED } from "../components/Types";

configure({ enforceActions: "observed" });

export class GameStore {
  constructor() {
    const ghosts = this.ghosts;
    ghosts[0].ghostNumber = 0;
    ghosts[0].color = "red";
    ghosts[0].vx = SPEED;
    ghosts[0].vy = 0;
    [ghosts[0].minX, ghosts[0].minY] = screenFromTileCoordinates(1, 1);
    [ghosts[0].maxX, ghosts[0].maxY] = screenFromTileCoordinates(26, 30);
    [ghosts[0].x, ghosts[0].y] = screenFromTileCoordinates(1, 29);

    ghosts[1].ghostNumber = 1;
    ghosts[1].color = "pink";
    ghosts[1].vx = SPEED;
    ghosts[1].vy = 0;
    [ghosts[1].minX, ghosts[1].minY] = screenFromTileCoordinates(15, 1);
    [ghosts[1].maxX, ghosts[1].maxY] = screenFromTileCoordinates(26, 29);
    [ghosts[1].x, ghosts[1].y] = screenFromTileCoordinates(31, 20);

    ghosts[2].ghostNumber = 2;
    ghosts[2].color = "cyan";
    ghosts[2].vx = 0;
    ghosts[2].vy = SPEED;
    [ghosts[2].minX, ghosts[2].minY] = screenFromTileCoordinates(1, 17);
    [ghosts[2].maxX, ghosts[2].maxY] = screenFromTileCoordinates(30, 26);
    [ghosts[2].x, ghosts[2].y] = screenFromTileCoordinates(21, 23);

    ghosts[3].ghostNumber = 3;
    ghosts[3].color = "orange";
    [ghosts[3].minX, ghosts[3].minY] = screenFromTileCoordinates(1, 1);
    [ghosts[3].maxX, ghosts[3].maxY] = screenFromTileCoordinates(26, 30);
    [ghosts[3].x, ghosts[3].y] = screenFromTileCoordinates(7, 5);
    ghosts[3].vx = SPEED;
    ghosts[3].vy = 0;
  }

  @observable
  timestamp = 0;

  @observable
  previousTimestamp = 0;

  @computed
  get timeBetweenTicks() {
    return this.timestamp - this.previousTimestamp;
  }

  @observable
  gameRunning = true;

  ghosts = [
    new GhostStore(),
    new GhostStore(),
    new GhostStore(),
    new GhostStore(),
  ];

  pacMan = new PacManStore();

  @action.bound
  setPressedKey(pressedKey: string) {
    this.pacMan.setPressedKey(pressedKey);
  }

  @action.bound
  stopGame() {
    this.gameRunning = false;
  }
}
