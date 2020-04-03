import { TileCoordinates } from './Coordinates';
import { Game } from './Game';
import {
  chooseNewTargetTile,
  chooseGhost2IntermediateTile,
} from './chooseNewTargetTile';
import { Store } from './Store';

describe('chooseNewTargetTile', () => {
  describe('chooseNewTargetTile()', () => {
    describe('in scatter mode', () => {
      it('returns the ghosts scatter tile', () => {
        const store = new Store();
        const game = new Game(store);
        const ghost = game.ghosts[0];
        // Place ghost outside the box
        ghost.setTileCoordinates({ x: 13, y: 11 });
        expect(ghost.state).toBe('scatter');
        const tile: TileCoordinates = chooseNewTargetTile(ghost);
        expect(tile).toEqual({ x: 26, y: 1 });
      });
    });

    describe('in chase mode', () => {
      describe('for Blinky (0)', () => {
        it('returns pac mans tile', () => {
          const store = new Store();
          const game = new Game(store);
          game.pacMan.setTileCoordinates({ x: 1, y: 1 });
          const ghost = game.ghosts[0];
          ghost.send('PHASE_END');
          expect(ghost.state).toBe('chase');
          const tile: TileCoordinates = chooseNewTargetTile(ghost);
          expect(tile).toEqual({ x: 1, y: 1 });
        });
      });

      describe('for Pinky (1)', () => {
        it('returns the tile 4 ahead of pac man', () => {
          const store = new Store();
          const game = new Game(store);
          game.pacMan.setTileCoordinates({ x: 1, y: 1 });
          game.pacMan.direction = 'RIGHT';

          const ghost = game.ghosts[1];
          ghost.send('PHASE_END');
          expect(ghost.state).toBe('chase');
          const tile: TileCoordinates = chooseNewTargetTile(ghost);
          expect(tile).toEqual({ x: 5, y: 1 });
        });

        describe('when pac man faces up', () => {
          it('returns the tile 4 ahead and to the left of pac man', () => {
            const store = new Store();
            const game = new Game(store);
            game.pacMan.setTileCoordinates({ x: 6, y: 5 });
            game.pacMan.direction = 'UP';

            const ghost = game.ghosts[1];
            ghost.send('PHASE_END');
            expect(ghost.state).toBe('chase');
            const tile: TileCoordinates = chooseNewTargetTile(ghost);
            expect(tile).toEqual({ x: 2, y: 1 });
          });
        });
      });

      describe('for Inky (2)', () => {
        it('returns the tile 4 ahead of pac man', () => {
          const store = new Store();
          const game = new Game(store);

          const ghost = game.ghosts[2];
          ghost.send('PHASE_END');
          expect(ghost.state).toBe('chase');
          game.pacMan.setTileCoordinates({ x: 6, y: 5 });
          game.pacMan.direction = 'DOWN';
          const blinky = game.ghosts[0];
          blinky.setTileCoordinates({ x: 6, y: 1 });

          expect(chooseGhost2IntermediateTile(ghost)).toEqual({ x: 6, y: 7 });

          const tile: TileCoordinates = chooseNewTargetTile(ghost);
          expect(tile).toEqual({ x: 6, y: 13 });
        });
      });

      describe('for Clyde (3)', () => {
        describe('when pac man is >= 8 tiles away', () => {
          it('returns pac mans tile', () => {
            const store = new Store();
            const game = new Game(store);
            game.pacMan.setTileCoordinates({ x: 6, y: 5 });
            const ghost = game.ghosts[3];
            ghost.send('PHASE_END');
            expect(ghost.state).toBe('chase');
            ghost.setTileCoordinates({ x: 21, y: 20 });
            const tile: TileCoordinates = chooseNewTargetTile(ghost);
            expect(tile).toEqual({ x: 6, y: 5 });
          });
        });

        describe('when pac man is < 8 tiles away', () => {
          it('returns clydes scatter tile', () => {
            const store = new Store();
            const game = new Game(store);
            game.pacMan.setTileCoordinates({ x: 6, y: 5 });
            const ghost = game.ghosts[3];
            ghost.send('PHASE_END');
            expect(ghost.state).toBe('chase');
            ghost.setTileCoordinates({ x: 1, y: 8 });
            const tile: TileCoordinates = chooseNewTargetTile(ghost);
            expect(tile).toEqual({ x: 1, y: 29 });
          });
        });
      });
    });

    describe('in frightened mode', () => {
      it('returns a random direction that is not backward and not in to a wall', () => {
        // Arrange
        const store = new Store();
        const game = new Game(store);
        game.timestamp = 1;
        const ghost = game.ghosts[0];
        ghost.setTileCoordinates({ x: 1, y: 1 });
        ghost.direction = 'DOWN';
        ghost.send('ENERGIZER_EATEN');
        expect(ghost.state).toBe('frightened');

        // Act
        const tile: TileCoordinates = chooseNewTargetTile(ghost);

        // Assert
        expect(tile).toEqual({ x: 2, y: 1 });
      });
    });
  });
});
