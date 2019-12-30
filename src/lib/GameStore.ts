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
    this.ghosts[0].ghostNumber = 0;
    this.ghosts[0].color = "red";
    this.ghosts[0].vx = SPEED;
    this.ghosts[0].vy = 0;
    [this.ghosts[0].minX, this.ghosts[0].minY] = screenFromTileCoordinates(
      1,
      1
    );
    [this.ghosts[0].maxX, this.ghosts[0].maxY] = screenFromTileCoordinates(
      26,
      30
    );
    [this.ghosts[0].x, this.ghosts[0].y] = screenFromTileCoordinates(1, 29);

    this.ghosts[1].ghostNumber = 1;
    this.ghosts[1].color = "pink";
    this.ghosts[1].vx = SPEED;
    this.ghosts[1].vy = 0;
    this.ghosts[1].minX = screenFromTileCoordinate(15);
    this.ghosts[1].maxX = screenFromTileCoordinate(26);
    this.ghosts[1].minY = screenFromTileCoordinate(1);
    this.ghosts[1].maxY = screenFromTileCoordinate(29);
    this.ghosts[1].x = screenFromTileCoordinate(31);
    this.ghosts[1].y = screenFromTileCoordinate(20);

    this.ghosts[2].ghostNumber = 2;
    this.ghosts[2].color = "cyan";
    this.ghosts[2].maxX = 800;
    this.ghosts[2].minX = 16;
    this.ghosts[2].minY = 20;
    this.ghosts[2].maxY = 39 * 16;
    this.ghosts[2].vx = 0;
    this.ghosts[2].vy = SPEED;
    this.ghosts[2].minX = screenFromTileCoordinate(1);
    this.ghosts[2].maxX = screenFromTileCoordinate(30);
    this.ghosts[2].minY = screenFromTileCoordinate(17);
    this.ghosts[2].maxY = screenFromTileCoordinate(26);
    this.ghosts[2].x = screenFromTileCoordinate(21);
    this.ghosts[2].y = screenFromTileCoordinate(23);

    this.ghosts[3].ghostNumber = 3;
    this.ghosts[3].color = "orange";
    this.ghosts[3].minX = screenFromTileCoordinate(1);
    this.ghosts[3].maxX = screenFromTileCoordinate(26);
    this.ghosts[3].minY = screenFromTileCoordinate(1);
    this.ghosts[3].maxY = screenFromTileCoordinate(30);
    this.ghosts[3].x = screenFromTileCoordinate(7);
    this.ghosts[3].y = screenFromTileCoordinate(5);
    this.ghosts[3].vx = SPEED;
    this.ghosts[3].vy = 0;
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
