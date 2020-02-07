import { GameStore } from './GameStore';
import { screenFromTile } from './Coordinates';
import { getGhostDestination } from './getGhostDestination';

describe('getGhostDestination', () => {
  describe('ghost 0', () => {
    it('is pac mans position', () => {
      const store = new GameStore();
      const { pacMan } = store;
      [pacMan.x, pacMan.y] = screenFromTile(3, 1);
      const destination = getGhostDestination({ ghostNumber: 0, store });
      expect(destination).toEqual([3, 1]);
    });
  });
});
