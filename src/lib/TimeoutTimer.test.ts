import { TimeoutTimer } from './TimeoutTimer';

describe('TimeoutTimer', () => {
  it('only counts down after start()', () => {
    // Arrange
    const onTimedOut = jest.fn();
    expect(onTimedOut.mock.calls).toHaveLength(0);
    const timer = new TimeoutTimer(3000, onTimedOut);

    // Act
    timer.countDown(5000);

    // Assert
    expect(onTimedOut.mock.calls).toHaveLength(0);
    expect(timer.timeLeft).toBe(3000);
  });

  it('counts down on countDown()', () => {
    // Arrange
    const onTimedOut = jest.fn();
    expect(onTimedOut.mock.calls).toHaveLength(0);
    const timer = new TimeoutTimer(3000, onTimedOut);
    timer.start();

    // Act
    timer.countDown(1000);

    // Assert
    expect(timer.timeLeft).toBe(2000);
  });

  it('times out after the given duration', () => {
    // Arrange
    const onTimedOut = jest.fn();
    expect(onTimedOut.mock.calls).toHaveLength(0);
    const timer = new TimeoutTimer(3000, onTimedOut);
    timer.start();

    // Act
    timer.countDown(1000);

    // Assert
    expect(onTimedOut.mock.calls).toHaveLength(0);
    expect(timer.timeLeft).toBe(2000);

    // Act
    timer.countDown(2000);

    // Assert
    expect(onTimedOut.mock.calls).toHaveLength(1);
  });

  it('stops after timing out', () => {
    // Arrange
    const onTimedOut = jest.fn();
    const timer = new TimeoutTimer(3000, onTimedOut);
    timer.start();

    timer.countDown(1000);
    timer.countDown(2000);
    expect(timer.isTimedOut).toBeTruthy();
    expect(timer.timeLeft).toBe(0);
    expect(onTimedOut.mock.calls).toHaveLength(1);

    // Act
    timer.countDown(1000);

    // Assert
    expect(timer.running).toBeFalsy();
    expect(timer.timeLeft).toBe(0);
    expect(onTimedOut.mock.calls).toHaveLength(1);
  });
});
