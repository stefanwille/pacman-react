import { GameStore } from './GameStore';
import { screenFromTile } from './Coordinates';

describe('Ghost', () => {
  describe('destinaton', () => {
    describe('ghost 0', () => {
      it('is pac mans position', () => {
        const gameStore = new GameStore();
        [gameStore.pacMan.x, gameStore.pacMan.y] = screenFromTile(3, 1);
        const destination = gameStore.ghosts[0].destination;
        expect(destination).toEqual([3, 1]);
      });
    });
  });
});
