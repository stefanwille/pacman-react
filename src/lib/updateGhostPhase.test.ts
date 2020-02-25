import { updateGhostPhase } from './updateGhostPhase';
import { Game } from './Game';

describe('updateGhostPhase', () => {
  describe('updateGhostPhase()', () => {
    it('reduces the phase timer and possibly sends a PHASE_END event', () => {
      // Arrange
      const game = new Game();
      const ghost = game.ghosts[0];
      expect(ghost.state).toBe('scatter');

      // Act
      game.previousTimestamp = game.timestamp;
      game.timestamp += 20 * 1000;
      updateGhostPhase({ store: game });

      // Assert
      expect(ghost.state).toBe('chase');

      // Act
      game.previousTimestamp = game.timestamp;
      game.timestamp += 7 * 1000;
      updateGhostPhase({ store: game });

      // Assert
      expect(ghost.state).toBe('scatter');
    });
  });
});
