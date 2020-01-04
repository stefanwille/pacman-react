import { interpret } from 'xstate';
import { PacManStateChart } from './PacManStateChart';

describe('PacManStateChart', () => {
  const pacManStateChart = interpret(PacManStateChart);

  beforeEach(() => {
    pacManStateChart.start();
  });

  it('starts in eating state', () => {
    expect(pacManStateChart.state.value).toBe('eating');
  });

  it('reacts to energizer', () => {
    expect(pacManStateChart.state.value).toBe('eating');

    pacManStateChart.send('ENERGIZER_EATEN');
    expect(pacManStateChart.state.value).toBe('hunting');

    pacManStateChart.send('ENERGIZER_TIMED_OUT');
    expect(pacManStateChart.state.value).toBe('eating');
  });

  it('reacts to collision with ghost', () => {
    expect(pacManStateChart.state.value).toBe('eating');

    pacManStateChart.send('ENERGIZER_EATEN');
    expect(pacManStateChart.state.value).toBe('hunting');

    pacManStateChart.send('COLLISION_WITH_GHOST');
    expect(pacManStateChart.state.value).toBe('hunting');

    pacManStateChart.send('ENERGIZER_TIMED_OUT');
    expect(pacManStateChart.state.value).toBe('eating');

    pacManStateChart.send('COLLISION_WITH_GHOST');
    expect(pacManStateChart.state.value).toBe('dead');

    pacManStateChart.send('REVIVED');
    expect(pacManStateChart.state.value).toBe('eating');
  });
});
