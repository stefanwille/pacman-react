import { TimeoutTimer } from './TimeoutTimer';

describe('TimeoutTimer', () => {
  describe('start()', () => {
    it('only counts down after start()', () => {
      // Arrange
      const onTimedOut = jest.fn();
      expect(onTimedOut.mock.calls).toHaveLength(0);
      const timer = new TimeoutTimer(3000, onTimedOut);

      // Act
      timer.advance(5000);

      // Assert
      expect(onTimedOut.mock.calls).toHaveLength(0);
      expect(timer.timeLeft).toBe(3000);
    });

    it('counts down on advance()', () => {
      // Arrange
      const onTimedOut = jest.fn();
      expect(onTimedOut.mock.calls).toHaveLength(0);
      const timer = new TimeoutTimer(3000, onTimedOut);
      timer.start();

      // Act
      timer.advance(1000);

      // Assert
      expect(timer.timeSpent).toBe(1000);
      expect(timer.timeLeft).toBe(2000);
    });

    it('times out after the given duration', () => {
      // Arrange
      const onTimedOut = jest.fn();
      expect(onTimedOut.mock.calls).toHaveLength(0);
      const timer = new TimeoutTimer(3000, onTimedOut);
      timer.start();

      // Act
      timer.advance(1000);

      // Assert
      expect(onTimedOut.mock.calls).toHaveLength(0);
      expect(timer.timeLeft).toBe(2000);

      // Act
      timer.advance(2000);

      // Assert
      expect(onTimedOut.mock.calls).toHaveLength(1);
      expect(timer.timeSpent).toBe(3000);
    });

    it('restarts on start()', () => {
      // Arrange
      const onTimedOut = jest.fn();
      const timer = new TimeoutTimer(3000, onTimedOut);
      timer.start();

      timer.advance(3000);

      expect(timer.isTimedOut).toBeTruthy();

      // Act
      timer.start();

      // Assert
      expect(timer.isTimedOut).toBeFalsy();
      expect(timer.timeLeft).toBe(3000);

      // Act
      timer.advance(3000);
      expect(onTimedOut.mock.calls).toHaveLength(2);
    });
  });

  it('stops after timing out', () => {
    // Arrange
    const onTimedOut = jest.fn();
    const timer = new TimeoutTimer(3000, onTimedOut);
    timer.start();

    timer.advance(1000);
    timer.advance(2000);
    expect(timer.isTimedOut).toBeTruthy();
    expect(timer.timeLeft).toBe(0);
    expect(onTimedOut.mock.calls).toHaveLength(1);

    // Act
    timer.advance(1000);

    // Assert
    expect(timer.running).toBeFalsy();
    expect(timer.timeLeft).toBe(0);
    expect(onTimedOut.mock.calls).toHaveLength(1);
  });

  describe('stop()', () => {
    it('stops the timer without calling the callback', () => {
      // Arrange
      const onTimedOut = jest.fn();
      const timer = new TimeoutTimer(3000, onTimedOut);
      timer.start();

      timer.advance(1000);
      timer.stop();

      timer.advance(2000);
      expect(timer.isTimedOut).toBeFalsy();
      expect(timer.timeLeft).toBe(2000);
      expect(onTimedOut.mock.calls).toHaveLength(0);
      expect(timer.running).toBeFalsy();
    });
  });
});
