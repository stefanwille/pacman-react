import { TileCoordinates } from './Coordinates';
import { Game } from './Game';
import { chooseNextTargetTile } from './chooseNewTargetTile';

describe('chooseNewTargetTile', () => {
  describe('chooseNewTargetTile()', () => {
    describe('in scatter mode', () => {
      it('selects the ghosts scatter tile', () => {
        const game = new Game();
        const ghost = game.ghosts[0];
        expect(ghost.state).toBe('scatter');
        expect(ghost.name).toBe('Blinky');
        const tile: TileCoordinates = chooseNextTargetTile(ghost);
        expect(tile).toEqual({ x: 26, y: 1 });
      });
    });
  });
});
