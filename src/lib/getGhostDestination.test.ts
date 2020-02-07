import { GameStore } from './GameStore';
import { screenFromTile } from './Coordinates';
import { getGhostDestination } from './getGhostDestination';

describe('getGhostDestination', () => {
  describe('ghost 0', () => {
    it('is pac mans position', () => {
      const gameStore = new GameStore();
      const { pacMan } = gameStore;
      [pacMan.x, pacMan.y] = screenFromTile(3, 1);
      const destination = getGhostDestination({ ghostNumber: 0, pacMan });
      expect(destination).toEqual([3, 1]);
    });
  });
});
