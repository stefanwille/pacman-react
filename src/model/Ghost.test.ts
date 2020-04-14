import { Game } from './Game';
import { Ghost } from './Ghost';
import { Store } from './Store';

describe('Ghost', () => {
  describe('when killing pac man', () => {
    it('pauses the ghost', () => {
      const store = new Store();
      const game = new Game(store);
      const ghost = game.ghosts[0];
      ghost.ghostPaused = false;
      expect(ghost.state).toBe('scatter');
      expect(ghost.ghostPaused).toBeFalsy();
      game.pacMan.send('COLLISION_WITH_GHOST');
      expect(ghost.ghostPaused).toBeFalsy();
    });
  });

  describe('when dying', () => {
    let game: Game;

    let ghost: Ghost;

    beforeEach(() => {
      const store = new Store();
      game = new Game(store);
      ghost = game.ghosts[0];
      ghost.ghostPaused = false;
      ghost.send('ENERGIZER_EATEN');
      expect(ghost.state).toBe('frightened');
      expect(ghost.ghostPaused).toBeFalsy();
      ghost.send('ENERGIZER_EATEN');
      ghost.send('COLLISION_WITH_PAC_MAN');
    });

    it('is dead', () => {
      expect(ghost.state).toBe('dead');
    });

    it('increments killedGhosts', () => {
      expect(game.killedGhosts).toBe(1);
    });

    it('score increases 100, 200, 400, 800', () => {
      expect(game.score).toBe(100);
    });
  });
});
