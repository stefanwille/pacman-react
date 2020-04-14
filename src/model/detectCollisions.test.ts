import { detectCollisions, BASIC_PILL_POINTS } from './detectCollisions';
import { Game } from './Game';
import { EMPTY_TILE_ID } from './MazeData';
import { ENERGIZER_POINTS } from './eatEnergizer';
import { Store } from './Store';

describe('detectCollisions', () => {
  describe('detectCollisions()', () => {
    describe('when hitting pill', () => {
      it('eats it', () => {
        const store = new Store();
        const game = new Game(store);
        const pacMan = game.pacMan;
        pacMan.setTileCoordinates({ x: 12, y: 8 });
        expect(game.score).toBe(0);
        detectCollisions(game);
        expect(game.score).toBe(BASIC_PILL_POINTS);
      });
    });

    describe('when hitting energizer', () => {
      let game: Game;

      beforeEach(() => {
        // Arrange
        const store = new Store();
        game = new Game(store);
        game.timestamp = 1;
        const pacMan = game.pacMan;
        pacMan.setTileCoordinates({ x: 26, y: 3 });
        expect(game.score).toBe(0);
        game.killedGhosts = 1;

        // Act
        detectCollisions(game);
      });

      it('eats it', () => {
        expect(game.score).toBe(ENERGIZER_POINTS);
        expect(game.maze.pills[3][26]).toBe(EMPTY_TILE_ID);
      });

      it('makes pacman chase', () => {
        expect(game.pacMan.state).toBe('chasing');
        expect(game.energizerTimer.running).toBeTruthy();
      });

      it('makes ghosts frightened', () => {
        expect(game.ghosts[0].state).toBe('frightened');
      });

      it('resets killed ghost counter', () => {
        expect(game.killedGhosts).toBe(0);
      });
    });
  });
});
