import { observable, computed } from 'mobx';

import { GhostPhase } from '../components/GhostsView';
import { Direction, SPEED } from '../components/Types';
import { screenFromTile } from './Coordinates';

export const makeGhosts = (): Ghost[] => {
  const ghosts: Ghost[] = [new Ghost(), new Ghost(), new Ghost(), new Ghost()];

  ghosts[0].ghostNumber = 0;
  ghosts[0].color = 'red';
  ghosts[0].vx = SPEED;
  ghosts[0].vy = 0;
  [ghosts[0].minX, ghosts[0].minY] = screenFromTile(1, 1);
  [ghosts[0].maxX, ghosts[0].maxY] = screenFromTile(26, 30);
  [ghosts[0].x, ghosts[0].y] = screenFromTile(1, 29);

  ghosts[1].ghostNumber = 1;
  ghosts[1].color = 'pink';
  ghosts[1].vx = SPEED;
  ghosts[1].vy = 0;
  [ghosts[1].minX, ghosts[1].minY] = screenFromTile(15, 1);
  [ghosts[1].maxX, ghosts[1].maxY] = screenFromTile(26, 29);
  [ghosts[1].x, ghosts[1].y] = screenFromTile(31, 20);

  ghosts[2].ghostNumber = 2;
  ghosts[2].color = 'cyan';
  ghosts[2].vx = 0;
  ghosts[2].vy = SPEED;
  [ghosts[2].minX, ghosts[2].minY] = screenFromTile(1, 17);
  [ghosts[2].maxX, ghosts[2].maxY] = screenFromTile(30, 26);
  [ghosts[2].x, ghosts[2].y] = screenFromTile(21, 23);

  ghosts[3].ghostNumber = 3;
  ghosts[3].color = 'orange';
  [ghosts[3].minX, ghosts[3].minY] = screenFromTile(1, 1);
  [ghosts[3].maxX, ghosts[3].maxY] = screenFromTile(26, 30);
  [ghosts[3].x, ghosts[3].y] = screenFromTile(7, 5);
  ghosts[3].vx = SPEED;
  ghosts[3].vy = 0;
  return ghosts;
};

export class Ghost {
  @observable
  timestamp = 0;

  ghostNumber = 0;

  color = 'ghost color';

  @observable
  x = 16;

  minX = 16;
  maxX = 17 * 16;

  @observable
  y = 16;

  minY = 16;
  maxY = 17 * 16;

  @observable
  vx = SPEED;

  @observable
  vy = 0;

  @computed
  get phase(): GhostPhase {
    return Math.round((this.timestamp + this.ghostNumber * 100) / 300) % 2 === 0
      ? 0
      : 1;
  }

  @computed
  get direction(): Direction {
    if (this.vx > 0) {
      return 'RIGHT';
    }
    if (this.vx < 0) {
      return 'LEFT';
    }
    if (this.vy > 0) {
      return 'DOWN';
    }
    return 'UP';
  }
}
