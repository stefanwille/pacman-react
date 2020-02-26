import { Game } from './Game';

describe('Ghost', () => {
  describe('when sending COLLISION_WITH_PAC_MAN', () => {
    it('pauses the ghost', () => {
      const game = new Game();
      const ghost = game.ghosts[0];
      ghost.ghostPaused = false;
      expect(ghost.ghostPaused).toBeFalsy();
      ghost.send('COLLISION_WITH_PAC_MAN');
      expect(ghost.ghostPaused).toBeTruthy();
    });
  });
});
