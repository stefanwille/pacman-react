import { TimeoutTimer } from './TimeoutTimer';

describe('TimeoutTimer', () => {
  describe('start()', () => {
    it('only counts down after start()', () => {
      // Arrange
      const onTimedOut = jest.fn();
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
      const timer = new TimeoutTimer(3000, onTimedOut);
      timer.start();

      // Act
      timer.advance(1000);

      // Assert
      expect(onTimedOut).not.toBeCalled();
      expect(timer.timeLeft).toBe(2000);

      // Act
      timer.advance(2000);

      // Assert
      expect(onTimedOut).toBeCalledTimes(1);
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
      expect(onTimedOut).toBeCalledTimes(1);
      expect(timer.isTimedOut).toBeFalsy();
      expect(timer.timeLeft).toBe(3000);

      // Act
      timer.advance(3000);
      expect(onTimedOut).toBeCalledTimes(2);
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
    expect(onTimedOut).toBeCalledTimes(1);

    // Act
    timer.advance(1000);

    // Assert
    expect(timer.running).toBeFalsy();
    expect(timer.timeLeft).toBe(0);
    expect(onTimedOut).toBeCalledTimes(1);
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

  describe('setDuration()', () => {
    it('sets the timeout duration', () => {
      // Arrange
      const onTimedOut = jest.fn();
      const timer = new TimeoutTimer(3000, onTimedOut);
      expect(timer.duration).toBe(3000);

      // Act
      timer.setDuration(5000);
      expect(timer.duration).toBe(5000);

      // Assert
      timer.start();
      timer.advance(3000);
      expect(timer.isTimedOut).toBeFalsy();
      timer.advance(2000);
      expect(timer.isTimedOut).toBeTruthy();
    });
  });

  describe('restart()', () => {
    it('resets the timeout time', () => {
      // Arrange
      const onTimedOut = jest.fn();
      const timer = new TimeoutTimer(3000, onTimedOut);
      timer.start();
      timer.advance(1000);
      expect(timer.timeLeft).toBe(2000);
      expect(timer.running).toBeTruthy();

      // Act
      timer.restart();

      // Assert
      expect(timer.timeLeft).toBe(3000);
      expect(timer.running).toBeTruthy();
    });
  });
});
