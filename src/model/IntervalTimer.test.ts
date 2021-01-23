import { IntervalTimer } from './IntervalTimer';

describe('IntervalTimer', () => {
  describe('start()', () => {
    it('only counts down after start()', () => {
      // Arrange
      const onInterval = jest.fn();
      const timer = new IntervalTimer(3000, onInterval);

      // Act
      timer.advance(5000);

      // Assert
      expect(onInterval).toBeCalledTimes(0);
      expect(timer.timeLeft).toBe(3000);
    });

    it('counts down on advance()', () => {
      // Arrange
      const onInterval = jest.fn();
      const timer = new IntervalTimer(3000, onInterval);
      timer.start();

      // Act
      timer.advance(1000);

      // Assert
      expect(timer.timeSpent).toBe(1000);
      expect(timer.timeLeft).toBe(2000);
    });

    it('times out after the given duration', () => {
      // Arrange
      const onInterval = jest.fn();
      const timer = new IntervalTimer(3000, onInterval);
      timer.start();

      // Act
      timer.advance(1000);

      // Assert
      expect(onInterval).not.toBeCalled();
      expect(timer.timeLeft).toBe(2000);

      // Act
      timer.advance(2000);

      // Assert
      expect(onInterval).toBeCalledTimes(1);
      expect(timer.timeSpent).toBe(0);
    });

    it('triggers multiple times', () => {
      // Arrange
      const onInterval = jest.fn();
      const timer = new IntervalTimer(3000, onInterval);
      timer.start();

      // Act
      timer.advance(3000);

      // Assert
      expect(onInterval).toBeCalledTimes(1);
      expect(timer.timeSpent).toBe(0);

      // Act
      timer.advance(3000);

      // Assert
      expect(onInterval).toBeCalledTimes(2);
      expect(timer.timeSpent).toBe(0);
    });
  });

  describe('stop()', () => {
    it('stops the timer without calling the callback', () => {
      // Arrange
      const onInterval = jest.fn();
      const timer = new IntervalTimer(3000, onInterval);
      timer.start();

      timer.advance(1000);
      timer.stop();

      timer.advance(2000);
      expect(timer.isTimedOut).toBeFalsy();
      expect(timer.timeLeft).toBe(2000);
      expect(onInterval).toBeCalledTimes(0);
      expect(timer.running).toBeFalsy();
    });
  });

  describe('setDuration()', () => {
    it('sets the timeout duration', () => {
      // Arrange
      const onInterval = jest.fn();
      const timer = new IntervalTimer(3000, onInterval);
      expect(timer.duration).toBe(3000);

      // Act
      timer.setDuration(5000);
      expect(timer.duration).toBe(5000);

      // Assert
      timer.start();
      timer.advance(3000);
      timer.advance(2000);
      expect(onInterval).toBeCalledTimes(1);
    });
  });

  describe('restart()', () => {
    it('resets the timeout time', () => {
      // Arrange
      const onInterval = jest.fn();
      const timer = new IntervalTimer(3000, onInterval);
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
