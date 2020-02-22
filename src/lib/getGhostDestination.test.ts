import { Game } from './Game';
import { getGhostDestination } from './getGhostDestination';

describe('getGhostDestination', () => {
  describe('ghost 0', () => {
    it('is pac mans position', () => {
      const store = new Game();
      const { pacMan } = store;
      pacMan.setTileCoordinates({ x: 3, y: 1 });
      const destination = getGhostDestination({ ghostNumber: 0, store });
      expect(destination).toEqual({ x: 3, y: 1 });
    });
  });
});
