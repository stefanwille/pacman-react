import { GameStore } from './GameStore';
import { getGhostDestination } from './getGhostDestination';

describe('getGhostDestination', () => {
  describe('ghost 0', () => {
    it('is pac mans position', () => {
      const store = new GameStore();
      const { pacMan } = store;
      pacMan.setTileCoordinates({ x: 3, y: 1 });
      const destination = getGhostDestination({ ghostNumber: 0, store });
      expect(destination).toEqual({ x: 3, y: 1 });
    });
  });
});
