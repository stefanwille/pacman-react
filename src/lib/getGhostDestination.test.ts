import { Game } from './Game';
import { getGhostDestination } from './getGhostDestination';
import { Store } from './Store';

describe('getGhostDestination', () => {
  describe('ghost 0', () => {
    it('is pac mans position', () => {
      const store = new Store();
      const game = new Game(store);
      const { pacMan } = game;
      pacMan.setTileCoordinates({ x: 3, y: 1 });
      const destination = getGhostDestination({ ghostNumber: 0, game });
      expect(destination).toEqual({ x: 3, y: 1 });
    });
  });
});
