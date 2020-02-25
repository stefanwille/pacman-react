import { updateGhostPhase, updateGhostPhaseTime } from './updateGhostPhase';
import { Game } from './Game';

describe('updateGhostPhase', () => {
  describe('updateGhostPhaseTime()', () => {
    it('increments the phase timer', () => {
      // Arrange
      const game = new Game();
      const ghost = game.ghosts[0];
      ghost.phaseTime = 10000;

      // Act
      game.previousTimestamp = game.timestamp;
      game.timestamp += 20;
      updateGhostPhaseTime(ghost);

      // Assert
      expect(ghost.phaseTime).toBe(10020);
    });
  });

  describe('updateGhostPhase()', () => {
    it.only('checks the phase timer for reaching the phase end and possibly sends a PHASE_END event to the ghost', () => {
      // Arrange
      const game = new Game();
      const ghost = game.ghosts[0];
      expect(ghost.state).toBe('scatter');

      game.previousTimestamp = game.timestamp;
      game.timestamp += 7 * 1000;
      updateGhostPhaseTime(ghost);

      // Act
      updateGhostPhase(ghost);

      // Assert
      expect(ghost.state).toBe('chase');
      expect(ghost.phaseTime).toBe(0);

      // Arrange
      game.previousTimestamp = game.timestamp;
      game.timestamp += 20 * 1000;
      updateGhostPhaseTime(ghost);
      expect(ghost.phaseTime).toBe(20 * 1000);

      // Act
      updateGhostPhase(ghost);

      // Assert
      expect(ghost.phaseTime).toBe(0);
      expect(ghost.state).toBe('scatter');
    });
  });
});
