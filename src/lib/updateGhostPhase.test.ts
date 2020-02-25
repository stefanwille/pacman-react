import { updateGhostPhase, updateGhostPhaseTimer } from './updateGhostPhase';
import { Game } from './Game';

describe('updateGhostPhase', () => {
  describe('updateGhostPhaseTimer()', () => {
    it('reduces the phase timer', () => {
      // Arrange
      const game = new Game();
      const ghost = game.ghosts[0];
      ghost.phaseTimerTimeLeft = 10000;

      // Act
      game.previousTimestamp = game.timestamp;
      game.timestamp += 20;
      updateGhostPhaseTimer(ghost);

      // Assert
      expect(ghost.phaseTimerTimeLeft).toBe(9980);
    });
  });

  describe('updateGhostPhase()', () => {
    it('reduces the phase timer and possibly sends a PHASE_END event to the ghost', () => {
      // Arrange
      const game = new Game();
      const ghost = game.ghosts[0];
      expect(ghost.state).toBe('scatter');

      // Act
      game.previousTimestamp = game.timestamp;
      game.timestamp += 20 * 1000;
      updateGhostPhaseTimer(ghost);
      updateGhostPhase(ghost);

      // Assert
      expect(ghost.state).toBe('chase');

      // Act
      game.previousTimestamp = game.timestamp;
      game.timestamp += 7 * 1000;
      updateGhostPhaseTimer(ghost);
      updateGhostPhase(ghost);

      // Assert
      expect(ghost.state).toBe('scatter');
    });
  });
});
