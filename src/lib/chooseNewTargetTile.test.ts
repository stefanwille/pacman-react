import { TileCoordinates } from './Coordinates';
import { Game } from './Game';
import { chooseNextTargetTile } from './chooseNewTargetTile';

describe('chooseNewTargetTile', () => {
  describe('chooseNewTargetTile()', () => {
    describe('in scatter mode', () => {
      it('returns the ghosts scatter tile', () => {
        const game = new Game();
        const ghost = game.ghosts[0];
        expect(ghost.state).toBe('scatter');
        const tile: TileCoordinates = chooseNextTargetTile(ghost);
        expect(tile).toEqual({ x: 26, y: 1 });
      });
    });

    describe('in chase mode', () => {
      describe('for Blinky', () => {
        it('returns pac mans tile', () => {
          const game = new Game();
          const ghost = game.ghosts[0];
          ghost.send('PHASE_END');
          expect(ghost.state).toBe('chase');
          const tile: TileCoordinates = chooseNextTargetTile(ghost);
          expect(tile).toEqual(game.pacMan.tileCoordinates);
        });
      });
    });
  });
});
